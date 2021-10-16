import * as PerkuliahanDAO from '../dao/Perkuliahan'
import { validationResult } from 'express-validator/check'
import Mahasiswa from '../models/Mahasiswa'
import Kelas from '../models/Kelas'

export const getAllPerkuliahan = async (req, res, next) => {
    try{
        const perkuliahan = await PerkuliahanDAO.findAllPerkuliahanById()
        res.status(200).json({
            message: 'get all perkuliahan success',
            data: {
                perkuliahan
            }
        })
    } catch (error){
        next(error)
    }
}

export const getPerkuliahanBynimByMatkul = async (req, res, next) => {
    const { nim, id_mata_kuliah } = req.query
    try {
        const perkuliahan = await PerkuliahanDAO.getPerkuliahanBynimByMatkul(nim, id_mata_kuliah)
        res.json({
            message: `Get Perkuliahan dengan nim=${nim} dan id_mata_kuliah=${id_mata_kuliah} berhasil`,
            data: {
                perkuliahan
            }
        })
    }
    catch(error) {
        res.status(error.status).json ({ error })
      }
} 