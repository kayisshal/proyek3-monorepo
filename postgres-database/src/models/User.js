import Sequelize from 'sequelize'
import db from '../db'

const User = db.define('User', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
},
{
  name: {
    singular: 'User',
    plural: 'Users'
  }
}
)

export default User
