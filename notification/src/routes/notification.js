import express from 'express'
import * as notificationController from '../controller/notification'

const router = express.Router()

router.post('/notify', notificationController.notify)

export default router
