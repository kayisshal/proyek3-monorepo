import Sequelize from 'sequelize'

import db from '../db'

const keterangan = db.define('Keterangan',
  {
    id_keterangan: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nim: {
      // foreign key
      type: Sequelize.INTEGER,
      references: {
        model: 'mahasiswa',
        key: 'nim'
      }
    },
    status: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    },
    isAccepted: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    tableName: 'Keterangan'
  }
)

export default keterangan
