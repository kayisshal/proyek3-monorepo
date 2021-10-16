import Sequelize from 'sequelize'

import db from '../db'

const Kelas = db.define('Kelas', {
  kode_kelas: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  kode_program_studi: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nip: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tahun: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

export default Kelas
