import express from 'express'
import * as UserDeviceController from '../controller/User_Device'
import * as ValidatorSanitizer from '../middleware/InputValidatorSanitizer'
import { transactionMiddleware } from '../middleware/transaction'

const router = express.Router()

router.post(
  '/create',
  ValidatorSanitizer.createUserDevice,
  transactionMiddleware,
  UserDeviceController.createUserDevice
)

export default router
