import express from 'express'
import * as UserController from '../controller/grup'
import * as ValidatorSanitizer from '../middleware/InputValidatorSanitizer'
import { transactionMiddleware } from '../middleware/transaction'

const router = express.Router()

router.post(
  '/addNewUser',
  ValidatorSanitizer.addUserToGroup,
  transactionMiddleware,
  UserController.addUserToGroup
)
router.post(
  '/create',
  ValidatorSanitizer.createGroup,
  transactionMiddleware,
  UserController.createGroup
)

export default router
