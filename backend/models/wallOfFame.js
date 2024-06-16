const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const WallOfFame = sequelize.define(
  "WallOfFame",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Scores: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seconds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "pseudo",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "walloffames",
    timestamps: true,
    updatedAt: "updatedAt",
    createdAt: "createdAt",
  }
);

WallOfFame.belongsTo(User, { foreignKey: "login", targetKey: "pseudo" });

module.exports = WallOfFame;
