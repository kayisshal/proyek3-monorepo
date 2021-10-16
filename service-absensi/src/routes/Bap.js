import express from 'express'
import * as BapController from '../controller/Bap'

const router = express.Router()

router.get('/data-bap', BapController.getDataBAP)
router.post('/upload', BapController.uploadBAP)
router.get('/find-bap', BapController.findBap)

export default router
