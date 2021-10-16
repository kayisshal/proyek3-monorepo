import Sequelize from 'sequelize'

import db from '../db'

const Nilai = db.define('Nilai', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  kode_kategori: {
    type: Sequelize.STRING,
    allowNull: false,
    references:{
      model:'Kategori_Nilai',
      key:'kode_kategori',
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },
  nim: {
    type: Sequelize.STRING,
    allowNull: false,
    references:{
      model:'Mahasiswa',
      key:'nim',
    },
    onUpdate: 'cascade',
    onDelete: 'set null'
  },
  nilai: {
    type: Sequelize.DOUBLE
  },
}, {
  timestamps: false
})

export default Nilai