import Sequelize from 'sequelize'

import db from '../db'

const Pengajar = db.define('Pengajar', {
  nip: {
    type: Sequelize.STRING,
    allowNull: false
  },
  id_perkuliahan: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})
Pengajar.removeAttribute('id')

export default Pengajar
