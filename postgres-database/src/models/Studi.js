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
  }
})

export default Studi
