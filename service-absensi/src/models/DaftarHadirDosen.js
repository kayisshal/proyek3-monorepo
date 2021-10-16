import Sequelize from 'sequelize'

import db from '../db'

const DaftarHadirDosen = db.define(
  'daftar_hadir_dosen',
  {
    id_daftar_hadir_dosen: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    nip: {
      type: Sequelize.STRING(30),
      allowNull: false,
      references: {
        model: 'Dosen',
        key: 'nip'
      }
    },
    id_studi: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Studi',
        key: 'id'
      }
    },
    tanggal: {
      type: Sequelize.DATEONLY
    },
    isHadir: {
      type: Sequelize.BOOLEAN
    },
    idJadwal: {
      type: Sequelize.INTEGER
    }
  },
  {
    tableName: 'daftar_hadir_dosen'
  }
)

export default DaftarHadirDosen
