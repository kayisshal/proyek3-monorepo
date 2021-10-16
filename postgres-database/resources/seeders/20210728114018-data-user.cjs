'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `insert into "User" (id, email)
      values ('196610181995121000', 'joelianmin@jtk.polban.ac.id'),
      ('198903252019032000', 'sri.ratna@jtk.polban.ac.id'),
      ('199112182019032000', 'siti.dwi@jtk.polban.ac.id'),
      ('181524031', 'zara.veda.tif418@polban.ac.id'),
      ('181524026', 'raefaldhi.amartya.tif418@polban.ac.id')`
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DELETE FROM "User";
    `)
  }
};
