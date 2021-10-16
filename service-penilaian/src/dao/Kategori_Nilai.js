import Kategori_Nilai from '../models/Kategori_Nilai.js'
import MataKuliah from '../models/Mata_Kuliah.js'

import sequelize from '../db.js'


export const insertOneKategoriNilai = async (id_kategori,parent,nama_kategori,bobot_nilai,id_mata_kuliah) => {
  try {
    const mata_kuliah = await Mata_Kuliah.findOne({
      where : {id_mata_kuliah: id_mata_kuliah}
    })
    if(id_mata_kuliah === null){
      console.log("Id mata kuliah tidak ditemukan")
      throw error
    }
    const newKategoriNilai = await Kategori_Nilai.create({
      id_kategori: id_kategori,
      parent: parent,
      nama_kategori: nama_kategori,
      id_mata_kuliah: mata_kuliah.id_mata_kuliah,
    })
    return newKategoriNilai
  } catch (error) {
    console.log(error)
  }
}

export const findKategoriByPerkuliahan = async(idPerkuliahan) => {
  try{
    const kategoriNilai = await Kategori_Nilai.findAll({
      where: {
        id_perkuliahan: idPerkuliahan
      }
    })
    return kategoriNilai
  } catch(error){
    return Promise.reject(new Error('Find Pengajar by NIP gagal'))
  }
}