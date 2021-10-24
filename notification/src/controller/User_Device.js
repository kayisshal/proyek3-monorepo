import { insertOneUserDevice } from '../dao/User_Device'

export const createUserDevice = async (req, res, next) => {
  try {
    const { user_id, token } = req.body

    let result = await insertOneUserDevice(user_id, token)

    if (typeof result === 'undefined') {
      const error = new Error('Inser User Device gagal')
      error.statusCode = 500
      error.cause = 'Inser User Device gagal'
      throw error
    }

    res.status(200).json({
      message: 'Insert user device berhasil',
      data: result
    })
  } catch (error) {
    next(error)
  }
}
