'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
        'Tugas',
        'id_perkuliahan', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Perkuliahan',
                key: 'id'
            },
        });
    await queryInterface.addColumn(
        'Tugas',
        'nip', {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'Dosen',
                key: 'nip'
            },
        });
    await queryInterface.addColumn(
        'Subtugas',
        'id_tugas', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Tugas',
                key: 'id'
            },
        });
    await queryInterface.addColumn(
        'Subtugas',
        'id_studi', {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            references: {
                model: 'Studi',
                key: 'id'
            },
        });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Subtugas', 'id_studi');
    await queryInterface.removeColumn('Subtugas', 'id_tugas');
    await queryInterface.removeColumn('Tugas', 'nip');
    await queryInterface.removeColumn('Tugas', 'id_perkuliahan');
  }
};