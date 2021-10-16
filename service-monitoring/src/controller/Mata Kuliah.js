import * as PengajarDAO from '../dao/Pengajar'
import * as PerkuliahaDAO from '../dao/Perkuliahan'
import * as MatkulDAO from '../dao/Mata Kuliah'
import * as KelasDAO from '../dao/Kelas'
import { validationResult } from 'express-validator/check'

export const getMatkulAjarByDosen = async (req, res) => {
    try {
        const nip = req.params.nip
        const idKelas = req.params.id_kelas
        const pengajar = await PengajarDAO.findPengajarByNIP(nip)
        var i
        var id_perkuliahan = []
        var listIdPerkuliahan = []
        var listMatkul = []
        for (i = 0; i < pengajar.length; i++){
            var idPerkuliahan = pengajar[i].id_perkuliahan
            listIdPerkuliahan.push(idPerkuliahan)
        }
        for (i = 0; i < listIdPerkuliahan.length; i++){
            var perkuliahan = await PerkuliahaDAO.findPerkuliahanById(listIdPerkuliahan[i])
            if (perkuliahan.kode_kelas == idKelas){
                var matkul = await MatkulDAO.findMatkulById(perkuliahan.id_mata_kuliah)
                listMatkul.push(matkul)
                id_perkuliahan.push(perkuliahan.id)
            }
        }
        res.status(200).json({
            message: 'get matkul by dosen sukses',
            data: {
                listMatkul,
                id_perkuliahan
            }
        })
    }
    catch (error) {
        res.status(error.status).json({ error })
    }
}

export const getAllMatkulLearnedByMahasiswa = async(req, res) => {
    const nim = req.params.nim
    try {
        const matkul = await MatkulDAO.getAllMatkulLearnedByMahasiswa(nim)
        res.json({
            message: 'Get All Matkul yang dipelajari mahasiswa berhasil',
            data: {
                matkul
            }
        })
    }
    catch (error) {
        res.status(error.status).json ({ error })
    }
}