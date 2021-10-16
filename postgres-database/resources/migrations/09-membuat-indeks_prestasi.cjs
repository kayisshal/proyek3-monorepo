'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Indeks_prestasi', {
      id_ip: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true,
      },	
      ip_semester: {
        type: Sequelize.DOUBLE,
        allowNull: false,
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
	  semester: {
        type: Sequelize.STRING,
        references:{
          model:'Mata_Kuliah',
          key:'semester',
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Indeks_prestasi');
  }
};
