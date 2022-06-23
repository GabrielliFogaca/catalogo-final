const Sequelize = require("sequelize");
const connection = require("../database/db");

const Filme = connection.define(
  "filme", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    classificacao: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    resumo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
},
{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
}
);

const initTable = async () => {
    await Filme.sync();
  };
  
  initTable();
  
  module.exports = Filme;
  

module.exports = Filme;