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
    type: Sequelize.INTEGER,
    references: {
      model: 'Perkuliahan',
      key: 'id'
    }
  },
  id_mahasiswa: {
    type: Sequelize.STRING(15),
    allowNull: false,
    references: {
      model: 'Mahasiswa',
      key: 'nim'
    }
  }
})

export default Studi
