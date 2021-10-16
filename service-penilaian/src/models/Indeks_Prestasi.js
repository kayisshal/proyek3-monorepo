import Sequelize from 'sequelize'

import db from '../db'

const indeks_prestasi = db.define('Indeks Prestasi', {
    id_ip: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey:true,
    },
    ip_semester: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nim: {
	  type: Sequelize.STRING,
      references:{
        model:'Mahasiswa',
        key:'nim',
      },
      onUpdate: 'cascade',
      onDelete: 'set null'      
    },
  semester: {
      type: Sequelize.STRING,
    }
})

export default Kelas
