import Sequelize from 'sequelize'
import db from '../db'

const UserGroup = db.define('User_Group', {
  nama_grup: {
    type: Sequelize.STRING
  },
  id_user: {
    type: Sequelize.STRING
  }
})

export default UserGroup
