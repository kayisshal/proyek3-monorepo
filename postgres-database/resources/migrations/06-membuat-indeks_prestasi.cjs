'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Indeks_prestasi', {
      ip_semester: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Indeks_prestasi');
  }
};
