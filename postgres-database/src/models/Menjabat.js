import Sequelize from 'sequelize'
import db from '../db'

const Menjabat = db.define('Menjabat', {
  nip: {
    type: Sequelize.STRING,
    allowNull: false
  },
  id_jabatan: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})
Menjabat.removeAttribute('id')

export default Menjabat
