import express from 'express'
import * as FinalisasiNilai from '../controller/FinalisasiNilai'
import * as NilaiController from '../controller/Nilai'
import * as NilaiAkhirController from '../controller/Nilai_Akhir'
import * as ValidatorSanitizer from '../middleware/InputValidatorSanitizer'

const router = express.Router()

//Dosen
router.post('/import-nilai/perkuliahan/:id_perkuliahan', NilaiController.importNilai)
router.get('/get-nilai/perkuliahan/:id_perkuliahan', NilaiController.getNilaiByPerkuliahan)
router.put('/update-nilai-akhir/perkuliahan/:id_perkuliahan', NilaiAkhirController.updateNilaiAkhir)
router.get('/get-nilai-akhir/perkuliahan/:id_perkuliahan', NilaiAkhirController.getNilaiAkhirByPerkuliahanDosen)

//Mahasiswa
router.get('/get-all-nilai-akhir/mahasiswa/:nim', NilaiAkhirController.getNilaiAkhirByMahasiswa)
router.get('/get-nilai-akhir/mahasiswa/:nim/semester/:semester', NilaiAkhirController.getNilaiAkhirSemesterByMahasiswa)

router.post('/finalisasi/perkuliahan/:id_perkuliahan', FinalisasiNilai.FinalisasiNilai)
export default router
