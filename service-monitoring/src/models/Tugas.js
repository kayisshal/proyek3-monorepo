import Sequelize from 'sequelize'
import db from '../db'

const Tugas = db.define('Tugas', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nama_tugas: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status_progress: {
    type: Sequelize.BOOLEAN
  },
  status_durasi: {
    type: Sequelize.BOOLEAN
  },
  status_skala: {
    type: Sequelize.BOOLEAN
  },
  status_catatan: {
    type: Sequelize.BOOLEAN
  },
  status_lampiran: {
    type: Sequelize.BOOLEAN
  },
  id_perkuliahan: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nip: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

export default Tugas
