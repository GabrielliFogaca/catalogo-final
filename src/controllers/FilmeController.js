const res = require("express/lib/response");
const Pokemon = require("../models/Filme");
const Op = require("sequelize").Op;

const orderById = { order: [["id", "ASC"]] };
let message = "";
let type = "";

const getAll = async (req, res) => {
  try {
    setTimeout(() => {
      message = "";
      type = "";
    }, 1000);

    const gabflix = await Filme.findAll(orderById);
    res.render("index", {
      gabflix,
      filmePut: null,
      filmeDel: null,
      message,
      type,
      filmeSearch: []
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const signup = (req, res) => {
  try {
    res.render("signup", { message, type });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const create = async (req, res) => {
  try {
    const filme = req.body;
    console.log(filme);
    if (
      !filme.titulo ||
      !filme.classificacao ||
      !filme.categoria ||
      !filme.resumo ||
      !filme.imagem
    ) {
      message = "Faltou algum campo!";
      type = "danger";
      return res.redirect("/signup");
    }

    await Filme.create(filme);
    message = "Filme inserido com sucesso";
    type = "success";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const method = req.params.method;
    const gabflix = await Pokemon.findAll(orderById);
    const filme = await Pokemon.findByPk(req.params.id);

    if (method == "put") {
      res.render("index", {
        gabflix,
        filmePut: filme,
        filmeDel: null,
        message,
        type,
        filmeSearch: []
      });
    } else {
      res.render("index", {
        gabflix,
        filmePut: null,
        filmeDel: filme,
        message,
        type,
        filmeSearch: []
      });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const update = async (req, res) => {
  try {
    const pokemon = req.body;
    await Pokemon.update(pokemon, { where: { id: req.params.id } });
    message = "Pokemon atualizado com sucesso!";
    type = "success";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await Filme.destroy({ where: { id: req.params.id } });
    message = "Seu filme foi deletado!";
    type = "success";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const searchByName = async (req, res) => {
  try {
    const filme = await Filme.findAll({
      where: {
        titulo: {
          [Op.like]: `%${req.body.filme}%`,
        },
      },
      order: [["id", "ASC"]]
    });

    if(filme.length == 0 ){
      message = "Esse filme nao esta disponivel."
      type = "warning"
      return res.redirect("/");
    }

    res.render("index", {
      gabflix: [],
      filmePut: null,
      filmeDel: null,
      message,
      type,
      filmeSearch: pokemon
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

module.exports = {
  getAll,
  signup,
  create,
  getById,
  update,
  remove,
  searchByName,
};
