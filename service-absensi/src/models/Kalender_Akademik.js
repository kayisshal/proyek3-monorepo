import Sequelize from 'sequelize'

import db from '../db'

const KalenderAkademik = db.define('kalender_akademik', {
  id_tata_usaha: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  tahun_ajaran: {
    type: Sequelize.STRING
  },
  tanggal: {
    type: Sequelize.DATE
  },
  event: {
    type: Sequelize.STRING
  }
})

export default KalenderAkademik
