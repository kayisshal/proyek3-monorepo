'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Kategori_Nilai', {
      parent: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nama_kategori: {
        type: Sequelize.STRING,
      },
      id_perkuliahan: {
        type: Sequelize.INTEGER,
        references:{
          model:'Perkuliahan',
          key:'id',
        },
        allowNull: false,
      },
      nip: {
        type: Sequelize.STRING,
        references:{
          model:'Dosen',
          key:'nip',
        },
        allowNull: false,
      },
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement: true
      },
      bobot_nilai: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    await queryInterface.createTable('Nilai', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      id_kategori: {
        type: Sequelize.INTEGER,
        references:{
          model:'Kategori_Nilai',
          key:'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      nim: {
        type: Sequelize.STRING,
        references:{
          model:'Mahasiswa',
          key:'nim',
        },
        onUpdate: 'cascade',
        onDelete: 'set null'
      },
      nilai: {
        type: Sequelize.INTEGER
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Nilai');
    await queryInterface.dropTable('Kategori_Nilai');
  }
};
