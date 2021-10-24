import Grup from '@proyek3/postgres-database/models/Grup'
import User from '@proyek3/postgres-database/models/User'
import { sendEmail } from '../util/mailer/mailer'

export const sendEmailGroupNotification = async (req, res, next) => {
  try {
    const { groupName, subject, bodyEmail } = req.body

    const group = await Grup.findByPk(groupName)
    if (!group) {
      const error = new Error('Grup tidak ditemukan')
      error.statusCode = 404
      error.cause = 'Nama grup tidak ditemukan'
      throw error
    }

    const listEmail = []
    const userList = await group.getUser()
    for (const el of userList) {
      listEmail.push(el.email)
    }

    const result = await sendEmail(subject, bodyEmail, listEmail)
    if (result instanceof Error) throw result

    res.json({
      message: 'Sukses mengirim email notifikasi',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const sendEmailToIdUser = async (req, res, next) => {
  try {
    const { idUser, subject, bodyEmail } = req.body

    const user = await User.findByPk(idUser)
    if (!user) {
      const error = new Error('User tidak ditemukan')
      error.statusCode = 404
      error.cause = 'Id User tidak ditemukan'
      throw error
    }

    const email = user.email

    const result = await sendEmail(subject, bodyEmail, email)
    if (result instanceof Error) throw result

    res.json({
      message: 'Sukses mengirim email notifikasi',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const sendEmailToAddress = async (req, res, next) => {
  try {
    const { recipientEmail, subject, bodyEmail } = req.body

    const result = await sendEmail(subject, bodyEmail, recipientEmail)
    if (result instanceof Error) throw result

    res.json({
      message: 'Sukses mengirim email notifikasi',
      data: result
    })
  } catch (error) {
    next(error)
  }
}
