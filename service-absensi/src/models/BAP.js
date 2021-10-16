import Sequelize from 'sequelize'

import db from '../db'

const bap = db.define('Bap', {
  id_BAP: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true

  },
  nip: {
    // foreign key
    type: Sequelize.STRING(30),
    references: {
      model: 'Dosen',
      key: 'nip'
    }
  },
  id_perkuliahan: {
    // foreign key
    type: Sequelize.INTEGER,
    references: {
      model: 'Perkuliahan',
      key: 'id'
    }
  },
  materi: {
    type: Sequelize.TEXT
  },
  kegiatan: {
    type: Sequelize.TEXT
  },
  minggu: {
    type: Sequelize.INTEGER
  },
  bukti: {
    // url dari location foto
    type: Sequelize.STRING
  },
  jumlah_mhs_hadir: {
    type: Sequelize.INTEGER
  },
  jumlah_mhs_tidak_hadir: {
    type: Sequelize.INTEGER
  },
  tanggal: {
    type: Sequelize.DATEONLY
  }
})

export default bap
