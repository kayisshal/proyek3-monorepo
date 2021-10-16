import Indeks_Prestasi from '../models/Indeks_Prestasi.js'
import Mahasiswa from '../models/Mahasiswa.js'

import sequelize from '../db.js'

export const insertOneIp = async (id_ip,ip_semester,nim,semester) => {
  try {
    const id_indeksprestasi = await Indeks_Prestasi.findOne({
      where : {id_ip: id_ip}
    })
    if(id_indeksprestasi === null){
      console.log("Ip Semester tidak ditemukan")
      throw error
    }
    const mahasiswa = await Mahasiswa.findOne({
      where : {nim: nim}
    })
    if(mahasiswa === null){
      console.log("Mahasiswa tidak ditemukan")
      throw error
    }
	
    const newIndeksPrestasi = await Indeks_Prestasi.create({
	  id_ip:id_ip
      ip_semester: ip_semester,
      nim: nim,
      semester semester
    })
    return newIndeksPrestasi
  } catch (error) {
    console.log(error)
  }
}

export const getOneIpBymahasiswa= async (nim) => {
  try {
    const indeksprestasi = await Indeks_Prestasi.findAll({
      where: {
        nim
      }
    })
    return indeksprestasi
  } catch (error) {
    return Promise.reject(new Error('Get ip by Mahasiswa'))
  }
}

export const getAllIndeksPrestasi = async () => {
  try {
    const indeksprestasi = await Indeks_Prestasi.findAll()
    return indeksprestasi
  } catch (error) {
    return Promise.reject(new Error('Get all Indeks prestasi gagal'))
  }
}

export const destroyIndeksPrestasiBymahasiswa = async (nim) => {
  try {
    const indeksprestasi = await Indeks_Prestasi.destroy({
      where: {
        nim
      }
    })
    return indeksprestasi
  } catch (error) {
    return Promise.reject(new Error('Delete indeks prestasi by Mahasiswa gagal'))
  }
}

export const updateIndeksPrestasibyMahasiswa = async (ip_semester,nim) => {
  try {
    const indeksprestasi = await Indeks_Prestasi.update(
      {
        ip_semester: ip_semester
      },
      {
        where: {
          nim
        },
        silent: true
      }
    )
    return indeksprestasi[0]
  } catch (error) {
    console.error(error)
  }
}