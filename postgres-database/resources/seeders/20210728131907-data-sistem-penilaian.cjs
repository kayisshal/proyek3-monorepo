'use strict';

module.exports = {
  // Data Nilai Akhir Mahasiswa (1 Mahasiswa nim 181524004)
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkUpdate('Studi', {
    nilai_akhir: 3,
    }, {
      id: [3,84,165,246,327,408,489,570],
    },
  );
  await queryInterface.bulkUpdate('Studi', {
    nilai_akhir: 3.5,
    }, {
      id: [30,111,192,273,354,435,516,597],
    },
  );
  await queryInterface.bulkUpdate('Studi', {
    nilai_akhir: 4,
    }, {
      id: [57,138,219,300,381,462,543],
    },
  );
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.sequelize.query(`DELETE FROM "Studi";`)
  }
};
