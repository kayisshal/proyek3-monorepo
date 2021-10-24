import Group from '@proyek3/postgres-database/models/Grup'
import User from '@proyek3/postgres-database/models/User'
import UserDevice from '@proyek3/postgres-database/models/User_Device'

const setAssociations = async () => {
  User.hasMany(UserDevice, {
    foreignKey: 'id_user'
  })
  User.belongsToMany(Group, {
    through: 'User_Group',
    foreignKey: 'id_user',
    as: 'Group'
  })
  Group.belongsToMany(User, {
    through: 'User_Group',
    foreignKey: 'nama_grup',
    as: 'User'
  })
}

export default setAssociations
