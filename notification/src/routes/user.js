import express from 'express'
import * as UserController from '../controller/user'
import * as ValidatorSanitizer from '../middleware/InputValidatorSanitizer'
import { validate } from '../middleware/input_validation'

const router = express.Router()

router.post(
  '/',
  ValidatorSanitizer.createUser,
  validate,
  UserController.createUser
)

export default router
