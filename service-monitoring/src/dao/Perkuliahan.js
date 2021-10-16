import Perkuliahan from '../models/Perkuliahan'
import Matkul from '../models/Mata_Kuliah'
import sequelize from '../db.js'
import db from '../db'

export const findPerkuliahanById = async (id) => {
  try {
    const perkuliahan = await Perkuliahan.findAll({
      where: {
        id: id
      }
    })
    return perkuliahan[0]
  } catch (error) {
    return Promise.reject(new Error('Find Perkuliahan by id gagal'))
  }
}

export const findPerkuliahanByMatkul = async (id) => {
  try {
    const perkuliahan = await Perkuliahan.findAll({
      where: {
        id_mata_kuliah: id
      }
    })
    return perkuliahan
  } catch (error) {
    return Promise.reject(new Error('Find Perkuliahan by id gagal'))
  }
}

export const getPerkuliahanBynimByMatkul = async (nim, id_mata_kuliah) => {
  try {
    const result = await db.query(`
    SELECT perkuliahan.* FROM "Mahasiswa" mhs
    INNER JOIN "Kelas" kelas ON kelas.kode_kelas = mhs.kode_kelas
    INNER JOIN "Perkuliahan" perkuliahan ON perkuliahan.kode_kelas = kelas.kode_kelas
    WHERE mhs.nim='${nim}' AND perkuliahan.id_mata_kuliah='${id_mata_kuliah}'
    ORDER BY id ASC
    `)
    const perkuliahan = result[0]
    return perkuliahan
  }
  catch (error) {
    return Promise.reject(error)
  }
}