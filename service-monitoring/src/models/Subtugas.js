import Sequelize from 'sequelize'
import db from '../db'

const Subtugas = db.define('Subtugas', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nama_subtugas: {
    type: Sequelize.STRING
  },
  progress: {
    type: Sequelize.INTEGER
  },
  durasi: {
    type: Sequelize.INTEGER
  },
  skala_pemahaman: {
    type: Sequelize.INTEGER
  },
  catatan: {
    type: Sequelize.STRING
  },
  lampiran: {
    type: Sequelize.STRING
  },
  waktu_selesai: {
    type: Sequelize.DATE
  },
  status_subtugas: {
    type: Sequelize.BOOLEAN
  },
  tenggat: {
    type: Sequelize.DATE
  },
  id_tugas: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  id_studi: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

export default Subtugas
