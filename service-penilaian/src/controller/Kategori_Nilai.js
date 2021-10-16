import * as KategoriNilaiDAO from '../dao/Kategori_Nilai'
import expressValidator from 'express-validator/check'
const { validationResult } = expressValidator

export const postNewKategoriNilai = async (req, res, next) => {
  try {
    const {
    id_kategori,
	  parent,
	  nama_kategori,
	  bobot_nilai,
    id_mata_kuliah
    } = req.body
    const error = validationResult(req)

    if (!error.isEmpty()) {
      error.status = 400
      throw error
    }

    const kategorinilaiInsert = await KategoriNilaiDAO.insertOneKategoriNilai(id_kategori,parent,nama_kategori,bobot_nilai,id_mata_kuliah)

    if (typeof kategorinilaiInsert === 'undefined') {
      error.status = 500
      error.message = 'Insert Kategori Nilai gagal'
      throw error
    }

    res.status(200).json({
      message: 'insert kategori nilai sukses',
      data: {
        kategorinilaiInsert
      }
    })
  } catch (error) {
    next(error)
  }
};