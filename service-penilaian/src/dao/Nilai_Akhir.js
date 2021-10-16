import Kategori_Nilai from '../models/Kategori_Nilai.js'
import Nilai from '../models/Nilai.js'
import Mahasiswa from '../models/Mahasiswa.js'
import Studi from '../models/Studi.js'

import sequelize from '../db.js'

/*
export const insertOneNilai = async (id_nilai,id_kategori,nilai,nim) => {
  try {
    const kategori_nilai = await Kategori_Nilai.findOne({
      where : {id_kategori: id_kategori}
    })
    if(kategori_nilai === null){
      console.log("kategori nilai tidak ditemukan")
      throw error
    }
    const mhs = await Mahasiswa.findOne({
        where: {nim: nim}
      })
    if(mhs === null){
      console.log("Nim tidak ditemukan")
      throw error
    }
    const newNilai = await Nilai.create({
      id_nilai: id_nilai,
      id_kategori: id_kategori,
      nilai: nilai,
      nim: mhs.nim,
    })
    return newNilai
  } catch (error) {
    console.log(error)
  }
}

export const importNilai = async (idMataKuliah,dataKategori, dataNilai) => {
  try {
    var dataKategori = dataKategori
    var dataNilai = dataNilai
    const idmatakuliah = idMataKuliah

    const kk = await Kategori_Nilai.findAll({
      where: { id_mata_kuliah: idmatakuliah}
    })
    if(kk !== null){
      await Kategori_Nilai.destroy({
          where: { id_mata_kuliah: idmatakuliah }
        })
    }
    const result = await Kategori_Nilai.bulkCreate(dataKategori)
    const result2 = await Nilai.bulkCreate(dataNilai)

    if(result === null){
      console.log("Kategori gagal di insert")
      throw error
    }
    if(result2 === null){
      console.log("Nilai gagal di insert")
      throw error
    }

    return result2
  } catch (error) {
    console.log(error)
  }
}

export const getOneNilaibyMahasiswa= async (NIM) => {
  try {
    const nilai = await Nilai.findAll({
      where: {
        NIM
      }
    })
    return nilai
  } catch (error) {
    return Promise.reject(new Error('Get nilai by Mahasiswa gagal'))
  }
}

export const getAllNilai = async () => {
  try {
    const nilai = await Nilai.findAll()
    return nilai
  } catch (error) {
    return Promise.reject(new Error('Get all nilai gagal'))
  }
}

export const updateNilaibyMahasiswa = async (NIM, nilai) => {
  try {
    const nilai_mahasiswa = await Nilai.update(
      {
        nilai_mahasiswa: nilai
      },
      {
        where: {
          NIM
        },
        silent: true
      }
    )
    return nilai_mahasiswa[0]
  } catch (error) {
    console.error(error)
  }
}

export const destroyNilaiByMahasiswa = async (NIM) => {
  try {
    const nilai = await Mahasiswa_nilai.destroy({
      where: {
        NIM
      }
    })
    return nilai
  } catch (error) {
    return Promise.reject(new Error('Delete Nilai by Mahasiswa gagal'))
  }
}*/

export const insertOneNilaiAkhir = async (id_studi,nilai_akhir,id) => {
  try {
    const studi = await Studi.findOne({
      where : {id_studi: id_studi}
    })
    if(studi === null){
      console.log("studi tidak ditemukan")
      throw error
    }
	const matkul = await Studi.findOne({
        where: {id: id}
      })
    if(matkul === null){
      console.log("Mata Kuliah tidak ditemukan")
      throw error
    }
    const newNilaiAkhir = await Studi.create({
      id_studi: id_studi,
      matkul: makul,
      nilai_akhir: nilai_akhir,
    })
    return newNilaiAkhir
  } catch (error) {
    console.log(error)
  }
}

export const getOneNilaiAkhirBymatkul= async (id) => {
  try {
    const nilaiakhir = await Studi.findAll({
      where: {
        id
      }
    })
    return nilaiakhir
  } catch (error) {
    return Promise.reject(new Error('Get nilai akhir by Mata Kuliah'))
  }
}

export const getAllNilaiAkhir = async () => {
  try {
    const nilaiakhir = await Studi.findAll()
    return nilaiakhir
  } catch (error) {
    return Promise.reject(new Error('Get all nilai gagal'))
  }
}

export const destroyNilaiAkhirByMataKuliah = async (id) => {
  try {
    const nilaiakhir = await studi.destroy({
      where: {
        id
      }
    })
    return nilaiakhir
  } catch (error) {
    return Promise.reject(new Error('Delete Nilai Akhir by Mahasiswa gagal'))
  }
}

export const updateNilaiAkhirbyMatkul = async (id, nilai_akhir) => {
  try {
    const nilai_akhir_mahasiswa = await Studi.update(
      {
        nilai_akhir_mahasiswa: nilai_akhir
      },
      {
        where: {
          id
        },
        silent: true
      }
    )
    return nilai_akkhir_mahasiswa[0]
  } catch (error) {
    console.error(error)
  }
}