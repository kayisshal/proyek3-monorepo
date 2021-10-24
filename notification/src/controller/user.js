import User from '@proyek3/postgres-database/models/User'

export const createUser = async (req, res, next) => {
  try {
    const { idUser, email } = req.body
    const [result, created] = await User.findOrCreate({
      where: {
        id: idUser
      },
      defaults: {
        id: idUser,
        email: email
      }
    })
    const messageResponse = !created
      ? 'Id user sudah terdaftar'
      : 'Berhasil membuat data user baru'
    res.status(201).json({
      message: messageResponse,
      data: result,
      isInserNew: created
    })
  } catch (error) {
    next(error)
  }
}
