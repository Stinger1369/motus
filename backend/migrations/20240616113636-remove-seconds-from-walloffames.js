"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("walloffames", "seconds");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("walloffames", "seconds", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
