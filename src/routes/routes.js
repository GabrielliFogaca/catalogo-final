const routes = require("express").Router();
const FilmeController = require("../controllers/FilmeController");

routes.get("/", FilmeController.getAll);
routes.get("/signup", FilmeController.signup);
routes.post("/create", FilmeController.create);
routes.get("/getById/:id/:method", FilmeController.getById);
routes.post("/update/:id", FilmeController.update);
routes.get("/remove/:id", FilmeController.remove);
routes.post("/search", FilmeController.searchByName);

module.exports = routes;
