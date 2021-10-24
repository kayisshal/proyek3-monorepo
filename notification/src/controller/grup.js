import Group from '@proyek3/postgres-database/models/Grup'
import User from '@proyek3/postgres-database/models/User'
import { insertOneGroup } from '../dao/grup'
import { validationResult } from 'express-validator'

export const createGroup = async (req, res, next) => {
  try {
    const { nama } = req.body

    let result = await insertOneGroup(nama)

    if (typeof result === 'undefined') {
      const error = new Error('Insert Grup gagal')
      error.statusCode = 500
      error.cause = 'Insert Grup gagal'
      throw error
    }

    res.status(200).json({
      message: 'Insert Grup berhasil',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const addUserToGroup = async (req, res, next) => {
  try {
    const userId = req.body.userId
    const email = req.body.email
    const groupName = req.body.groupName
    const error = validationResult(req)
    if (!error.isEmpty()) {
      error.status = 400
      throw error
    }
    const group = await Group.findByPk(groupName)
    if (!group) {
      const error = new Error('Invalid groupname')
      error.statusCode = 500
      error.cause = 'Group dengan nama tersebut tidak ada'
      throw error
    }
    let user = await User.findByPk(userId)
    if (!user) {
      if (!email) {
        const error = new Error('Invalid Input')
        error.statusCode = 400
        error.cause = 'Emailnya babi!'
        throw error
      }
      user = await User.create({
        id: userId,
        email
      })
    }
    await user.addGroup(group)
    res.json({
      message: 'Sucess',
      data: User.create
    })
  } catch (e) {
    next(e)
  }
}
