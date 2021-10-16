import express from 'express'
import * as JadwalController from '../controller/Jadwal'

const router = express.Router()

router.get('/dosen', JadwalController.getJadwalDosenHrTertentuHandler)
router.get('/mahasiswa', JadwalController.getJadwalMhsHrTertentuHandler)
router.get('/all', JadwalController.getAllJadwal)
router.post('', JadwalController.postNewJadwal)

export default router
