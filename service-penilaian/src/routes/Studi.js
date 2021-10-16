import express from 'express'
import * as NilaiController from '../controller/Nilai'
import * as ValidatorSanitizer from '../middleware/InputValidatorSanitizer'

const router = express.Router()

router.post('/new-nilai',ValidatorSanitizer.postNewNilai, NilaiController.postNewNilai)
router.post('/import-nilai', NilaiController.importNilai)
router.delete('/delete-nilaiByMahasiswa/:id_nilai',NilaiController.deleteNilaibyMahasiswa)
router.put('/update-nilai/:id_nilai',ValidatorSanitizer.updateNilaiMahasiswa, NilaiController.updateNilaibyMahasiswa)
router.get('/AllNilai', NilaiController.getAllNilai)
router.get('/One-nilaibyMahasiswa/:NIM', NilaiController.getOneNilaibyMahasiswa)

export default router
