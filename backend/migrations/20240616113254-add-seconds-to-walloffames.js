"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("walloffames", "seconds", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // Vous pouvez définir une valeur par défaut si nécessaire
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("walloffames", "seconds");
  },
};
