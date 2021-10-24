import express from 'express'
import * as emailNotifController from '../controller/email_notification'
import { validate } from '../middleware/input_validation'
import * as ValidatorSanitizer from '../middleware/InputValidatorSanitizer'

const router = express.Router()

router.post(
  '/',
  ValidatorSanitizer.sendEmailGroupNotification,
  validate,
  emailNotifController.sendEmailGroupNotification
)

router.post(
  '/personal',
  ValidatorSanitizer.sendEmailToIdUser,
  validate,
  emailNotifController.sendEmailToIdUser
)

router.post('/direct', emailNotifController.sendEmailToAddress)

export default router
