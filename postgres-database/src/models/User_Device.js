import Sequelize from 'sequelize'
import db from '../db'

const UserDevice = db.define('User_Device', {
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  id_user: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

export default UserDevice
