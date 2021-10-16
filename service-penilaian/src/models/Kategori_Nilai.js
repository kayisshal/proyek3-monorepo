import Sequelize from 'sequelize'
import db from '../db'

const Kategori_Nilai = db.define('Kategori_Nilai', {
  parent: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  nama_kategori: {
    type: Sequelize.STRING,
  },
  id_perkuliahan: {
    type: Sequelize.INTEGER,
    references:{
      model:'Perkuliahan',
      key:'id',
    },
    allowNull: false,
  },
  nip: {
    type: Sequelize.STRING,
    references:{
      model:'Dosen',
      key:'nip',
    },
  },
  kode_kategori: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey:true,
  },
  bobot_nilai: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
}, {
  timestamps:false
})

export default Kategori_Nilai