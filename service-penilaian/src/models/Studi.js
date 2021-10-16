import Sequelize from 'sequelize'

import db from '../db'

const Studi = db.define('Studi', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  id_perkuliahan: {
    type: Sequelize.INTEGER
  },
  id_mahasiswa: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nilai_akhir: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  nilai_ets: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  nilai_eas: {
    type: Sequelize.DOUBLE,
    allowNull: true
  }
})

export default Studi
