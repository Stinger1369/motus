const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Mots = sequelize.define(
  "Mots",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longueur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    difficulté: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "mots",
    timestamps: false,
  }
);

module.exports = Mots;
