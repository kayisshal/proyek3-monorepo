import UserDevice from '@proyek3/postgres-database/models/User_Device'

export const insertOneUserDevice = async (user_id, token) => {
  try {
    const userDevice = await UserDevice.create({
      token: token,
      id_user: user_id
    })

    if (userDevice instanceof Error) throw userDevice
    return userDevice
  } catch (error) {
    return Promise.reject(error)
  }
}
