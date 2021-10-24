import { body } from 'express-validator'

export const createGroup = [body('nama', 'Nama tidak boleh kosong').exists()]

export const createUserDevice = [
  body('user_id', 'User id tidak boleh kosong').exists(),
  body('token', 'Token tidak boleh kosong').exists()
]

export const addUserToGroup = [
  body('userId', 'User id tidak boleh kosong').exists(),
  body('groupName', 'Nama group tidak boleh kosong').exists()
]

export const sendEmailGroupNotification = [
  body('groupName')
    .trim()
    .notEmpty()
    .withMessage('Nama grup tidak boleh kosong')
    .isString()
    .withMessage('Nama grup harus bertipe string'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subjek email tidak boleh kosong'),
  body('bodyEmail').notEmpty().withMessage('Body email tidak boleh kosong')
]

export const sendEmailToIdUser = [
  body('idUser')
    .trim()
    .notEmpty()
    .withMessage('Id user tidak boleh kosong')
    .isString()
    .withMessage('Id user harus bertipe string'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subjek email tidak boleh kosong'),
  body('bodyEmail').notEmpty().withMessage('Body email tidak boleh kosong')
]

export const createUser = [
  body('idUser').trim().notEmpty().withMessage('Id user tidak boleh kosong'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email tidak boleh kosong')
    .isEmail()
    .withMessage('Format email harus valid')
]
