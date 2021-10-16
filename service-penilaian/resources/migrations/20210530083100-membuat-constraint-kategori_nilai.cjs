'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Kategori_Nilai', {
      fields: ['parent','nama_kategori','id_perkuliahan'],
      type: 'Unique',
      name: 'c_unique0_kategori_nilai'      
  })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Kategori_Nilai','c_unique0_kategori_nilai')
  }
};
