import Sequelize from 'sequelize'
import db from '../db'

const Jabatan = db.define('Jabatan', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nama_jabatan: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

export default Jabatan
