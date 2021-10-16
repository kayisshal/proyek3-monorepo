import express from 'express'
import * as KategoriNilaiController from '../controller/Kategori_Nilai'
import * as ValidatorSanitizer from '../middleware/InputValidatorSanitizer'

const router = express.Router()

router.post('/new-kategorinilai',ValidatorSanitizer.postNewKategoriNilai, KategoriNilaiController.postNewKategoriNilai)

export default router
