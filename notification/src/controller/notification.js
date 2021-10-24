import Grup from '@proyek3/postgres-database/models/Grup'
import UserDevice from '@proyek3/postgres-database/models/User_Device'
import UserGroup from '@proyek3/postgres-database/models/UserGroup'
import firebaseAdmin from '../firebase-admin'

export const notify = async (req, res) => {
  const userIds = req.body.userIds || []
  const groupIds = req.body.groupIds || []
  const registrationIds = []
  const data = req.body.data || ''
  console.log(groupIds)

  for (const groupId of groupIds) {
    console.log(groupId)
    const group = await Grup.findByPk(groupId)
    if (group) {
      const users = await UserGroup.findAll({
        where: { nama_grup: group.nama }
      })
      for (const user of users) {
        registrationIds.push(user.id_user)
      }
    }
  }

  for (const userId in userIds) {
    const userDevice = await UserDevice.findOne({
      where: { id_user: userId}
    })
    if (userDevice !== null) {
      registrationIds.push(userDevice.token)
    }
  }

  const quotient = Math.floor(registrationIds.length / 500)
  const remainder = registrationIds.length % 500
  for (let q = 0; q < quotient; ++q) {
    const index = q * 500
    firebaseAdmin.messaging().sendMulticast({
        data,
        tokens: registrationIds.slice(index, index + 500)
    })
  }
  if (remainder > 0) {
    firebaseAdmin.messaging().sendMulticast({
        data,
        tokens: registrationIds.slice(-remainder)
    })
  }

  res.status(204).end()
}