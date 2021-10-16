import * as NilaiDAO from '../dao/Nilai'
import * as kategoriNilaiDAO from '../dao/Kategori_Nilai'
import expressValidator from 'express-validator/check'
const { validationResult } = expressValidator

export const postNewNilai = async (req, res, next) => {
  try {
    const {
      id_nilai,
	  id_kategori,
	  nilai,
    nim
    } = req.body
    const error = validationResult(req)

    if (!error.isEmpty()) {
      error.status = 400
      throw error
    }

    const nilaiInsert = await NilaiDAO.insertOneNilai(id_nilai,id_kategori, nilai,nim)

    if (typeof nilaiInsert === 'undefined') {
      error.status = 500
      error.message = 'Insert Nilai gagal'
      throw error
    }

    res.status(200).json({
      message: 'insert nilai sukses',
      data: {
        nilaiInsert
      }
    })
  } catch (error) {
    next(error)
  }
}

export const importNilai = async (req, res, next) => {
  try {

    const dataKategori = req.body.dataKategori
    const dataNilai = req.body.dataNilai
    const id_perkuliahan = req.params.id_perkuliahan

    const error = validationResult(req)
    if (!error.isEmpty()) {
      error.status = 400
      throw error
    }

    const importNilai = await NilaiDAO.importNilai(id_perkuliahan,dataKategori, dataNilai)

    if (typeof importNilai === 'undefined') {
      error.status = 500
      error.message = 'Import Nilai gagal'
      throw error
    }

    res.status(200).json({
      message: 'Import nilai sukses',
      data: {
        importNilai
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getNilaiByPerkuliahan = async (req, res, next) => {
  try{
    const idPerkuliahan = req.params.id_perkuliahan
    const kategori = await kategoriNilaiDAO.findKategoriByPerkuliahan(idPerkuliahan)
    var listKategori = []
    var dataKategori = []
    for (var i = 0; i < kategori.length; i++){
      var kode_kategori = kategori[i].kode_kategori
      var ktgr = {
        kode_kategori: kategori[i].kode_kategori,
        parent: kategori[i].parent,
        nama_kategori: kategori[i].nama_kategori,
        bobot_nilai: kategori[i].bobot_nilai
      }
      listKategori.push(kode_kategori)
      dataKategori.push(ktgr)
    }

    const allNilai = await NilaiDAO.getNilaiByListKategoriPerkuliahan(listKategori)
    
    if(allNilai === null){
      console.log("Get nilai by perkuliahan gagal")
      throw error
    }
    res.status(200).json({
      message: 'get all nilai success',
      data: {
        dataKategori: dataKategori,
        dataNilai: allNilai
      }
    })
  } catch(error){
    next(error)
  }
}

export const deleteNilaibyMahasiswa = async (req, res, next) => {
  try {
    const nilaiId = req.params.id_nilai
    const result = await NilaiDAO.deleteNilaibyMahasiswa(nilaid)
    if (result === 1) {
      res.status(200).json({
        message: 'Delete nilai berhasil',
        data: {
          mahasiswaId
        }
      })
    } else {
      const error = new Error('Delete nilai gagal')
      error.statusCode = 500
      throw error
    }
  } catch (error) {
    next(error)
  }
}

export const getAllNilai = async (req, res, next) => {
  try {
    const nilai = await NilaiDAO.getAllNilai()
    res.status(200).json({
      message: 'get all nilai success',
      data: {
        nilai
      }
    })
  } catch (error) {
    next(error)
  }
}

export const updateNilaibyMahasiswa = async (req, res, next) => {
  try {
    const { id_mahasiswa } = req.params
    const updateNilai = await NilaiDAO.updateNilaibyMahasiswa(id_mahasiswa, req.body.nilai)
    if (updateNilai === 1) {
      const nilai = await NilaiDAO.getOneNilaibyMahasiswa(id_mahasiswa)
      res.status(200).json({
        message: 'Update Nilai Mahasiswa berhasil',
        data: {
          nilai
        }
      })
    } else {
      const error = new Error('Update Nilai Mahasiswa gagal')
      error.statusCode = 500
      error.cause = 'Update Nilai Mahasiswa gagal'
      throw error
    }
  } catch (error) {
    next(error)
  }
}

export const getOneNilaibyMahasiswa = async (req, res, next) => {
  try {
    const { NIM } = req.params
    const nilai = await NilaiDAO.getOneNilaibyMahasiswa(NIM)
    res.status(200).json({
      message: 'get one Mahasiswa by NIM success',
      data: {
        mahasiswa
      }
    })
  } catch (error) {
    next(error)
  }
}


