import * as SubtugasDAO from '../dao/Subtugas'
import * as TugasDAO from '../dao/Tugas'
import * as StudiDAO from '../dao/Studi'
import * as PerkuliahaDAO from '../dao/Perkuliahan'
import * as MahasiswaDAO from '../dao/Mahasiswa'
import { validationResult } from 'express-validator/check'
import Subtugas from '../models/Subtugas'
import Tugas from '../models/Tugas'
import moment from 'moment';

export const postNewSubtugas = async (req, res, next) => {
    try {
    const {nama_subtugas, tenggat, id_tugas, id_studi } = req.body
    const now = new Date()
    const status_subtugas = false
    const { createdAt, updatedAt} = now
    const error = validationResult(req)
    if (!error.isEmpty()) {
        error.status = 400
        throw error
    }
    const subtugas = await SubtugasDAO.insertOneSubtugas(nama_subtugas, tenggat, status_subtugas, createdAt, updatedAt, id_tugas, id_studi)
    res.status(200).json({
        message: 'insert subtugas sukses',
        data: {
            subtugas
        }
    })
}
    catch (error) {
        next(error)
    }
}

export const getSubtugasById = async (req, res, next) => {
    try {
        const id_subtugas = req.params.id_subtugas
        const subtugas = await SubtugasDAO.findSubtugasById(id_subtugas)
        var i
        //var NowMoment = moment()
        for (i=0; i<subtugas.length; i++){
            subtugas[i].tenggat = moment(subtugas[i].tenggat).format("YYY-MM-DD hh:mm:ss")
        }
        res.status(200).json({
            message: 'get subtugas by id sukses',
            data: {
                subtugas
            }
        })
    }
    catch (error) {
        next(error)
    }
}

export const getAllSubtugas = async (req, res, next) => {
    try{
        const subtugas = await SubtugasDAO.findAllSubtugasById()
        res.status(200).json({
            message: 'get all subtugas success',
            data: {
                subtugas
            }
        })
    } catch (error){
        next(error)
    }
}

export const getSubtugasByTugas = async (req, res, next) => {
    try {
        const id_tugas = req.params.id_tugas
        var subtugas = await SubtugasDAO.findSubtugasByTugas(id_tugas)
        const seen = new Set();

        const uniqueSubtugas = subtugas.filter(data => {
            const duplicate = seen.has(data.nama_subtugas);
            seen.add(data.nama_subtugas);
            return !duplicate;
        });

        res.status(200).json({
            message: 'get subtugas by tugas sukses',
            data: {
                uniqueSubtugas
            }
        })
    }
    catch (error) {
        next(error)
    }
}

export const updateSubtugasById = async (req, res, next) => {
    try {
        const id_subtugas = req.params.id
        const subtugas = await SubtugasDAO.findSubtugasById(id_subtugas)
        const listSubtugas = await SubtugasDAO.findSubtugasByTugas(subtugas.id_tugas)
        var listIdSubtugas = []
        var i
        var listUpdatedSubtugas = []
        var updatedSubtugas
        for (i = 0; i < listSubtugas.length; i++){
            if (listSubtugas[i].nama_subtugas == subtugas.nama_subtugas){
                listIdSubtugas.push(listSubtugas[i].id)
            }
        }
        const now = new Date()
        const updatedAt = now
        const nama_subtugas = req.body.nama_subtugas
        const tenggat = req.body.tenggat
        for (i=0; i<listIdSubtugas.length; i++){
            updatedSubtugas = await SubtugasDAO.UpdateOneSubtugas(listIdSubtugas[i], nama_subtugas, tenggat, updatedAt)
            listUpdatedSubtugas.push(updatedSubtugas)
        }
        res.status(200).json({
            message: 'update subtugas by id sukses',
            data: {
                listUpdatedSubtugas
            }
        })
    }
    catch (error) {
        next(error)
    }
}

export const updateSubtugas = async (req, res, next) => {
    try {
      const { id } = req.params
      const UpdateSubtugas = await SubtugasDAO.updateSubtugas(id, req.body.progress, req.body.skala_pemahaman, req.body.catatan)
      if (UpdateSubtugas === 1) {
        const subtugas = await SubtugasDAO.findOneSubtugasById(id)
        res.status(200).json({
          message: "Subtugas berhasil di update",
          data: {
            subtugas
          }
        })
      } else {
        const error = new Error("Subtugas gagal di update")
        error.statusCode = 500
        error.cause = 'Subtugas gagal di update'
        throw error
      }
    } catch (error) {
      next(error)
    }
  }

export const updateSubtugasLampiran = async (req, res, next) => {
    try {
      const { id } = req.params
      const UpdateSubtugasLampiran = await SubtugasDAO.updateSubtugasLampiran(id, req.body.lampiran)
      if(UpdateSubtugasLampiran === 1) {
        const subtugas = await SubtugasDAO.findOneSubtugasById(id)
        res.status(200).json({
          message: "Subtugas Berhasil di Update",
          data: {
            subtugas
          }
        })
      } else {
        const error = new Error("Subtugas gagal di update")
        error.statusCode = 500
        error.cause = 'Subtugas gagal di update'
        throw error
      } 
      }catch (error) {
        next(error)
      }
}

export const updateSubtugasDurasi = async (req, res, next) => {
    try {
      const { id } = req.params
      const UpdateSubtugasDurasi = await SubtugasDAO.updateSubtugasDurasi(parseInt(id), req.body.durasi)
      if(UpdateSubtugasDurasi === 1) {
        const subtugas = await SubtugasDAO.findOneSubtugasById(id)
        res.status(200).json({
          message: "Subtugas Berhasil di Update",
          data: {
            subtugas
          }
        })
      } else {
        const error = new Error("Subtugas gagal di update")
        error.statusCode = 500
        error.cause = 'Subtugas gagal di update'
        throw error
      } 
      }catch (error) {
        next(error)
      }
  }

  export const getSubtugasByMahasiswa = async(req, res) => {
    const nim = req.params.nim
    try {
      const subtugas = await SubtugasDAO.getSubtugasByMahasiswa(nim)
      res.json({
        message: 'Get Subtugas by nim berhasil',
        data: {
          subtugas
        }
      })
    }
    catch(error) {
      res.status(error.status).json ({ error })
    }
  }
  
export const getSubtugasByTugasandMahasiswa = async (req, res, next) => {
    try {
        const id_tugas = req.params.id_tugas
        const nim = req.params.nim
        var subtugas = await SubtugasDAO.findSubtugasByTugas(id_tugas)
        var listStudi = await StudiDAO.findStudiByIdMahasiswa(nim)
        var i, j
        var listSubtugas = []
        var listIdStudi = []
        for (i=0; i<listStudi.length; i++){
            listIdStudi.push(listStudi[i].id)
        }
        for (i=0; i<listIdStudi.length; i++){
            for (j=0; j<subtugas.length; j++){
                if (listIdStudi[i] == subtugas[j].id_studi){
                    listSubtugas.push(subtugas[j])
                }
            }
        }
        const seen = new Set();

        const uniqueSubtugas = listSubtugas.filter(data => {
            const duplicate = seen.has(data.nama_subtugas);
            seen.add(data.nama_subtugas);
            return !duplicate;
        });

        res.status(200).json({
            message: 'get subtugas by tugas dan mahasiswa sukses',
            data: {
                uniqueSubtugas
            }
        })
    }
    catch (error) {
        next(error)
    }
}

export const getAllSubtugasByTugas = async (req, res, next) => {
    try {
        const id_tugas = req.params.id
        var subtugas = await SubtugasDAO.findSubtugasByTugas(id_tugas)

        res.status(200).json({
            message: 'get subtugas by tugas sukses',
            data: {
                subtugas
            }
        })
    }
    catch (error) {
        next(error)
    }
}