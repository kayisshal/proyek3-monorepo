import MataKuliah from '../models/Mata_Kuliah'
import sequelize from '../db.js'
import db from '../db'

export const findMatkulById = async (id) => {
  try {
    const matkul = await MataKuliah.findByPk(id)
    return matkul
  } catch (error) {
    return Promise.reject(new Error('Find Matkul by ID gagal'))
  }
}

  export const getAllMatkulLearnedByMahasiswa = async(nim) => {
    try {
      const result = await db.query(`
      SELECT matkul.* FROM "Mahasiswa" mahasiswa
      INNER JOIN "Studi" studi ON studi.id_mahasiswa = mahasiswa.nim
      INNER JOIN "Perkuliahan" perkuliahan ON perkuliahan.id = studi.id_perkuliahan
      INNER JOIN "Mata_Kuliah" matkul ON matkul.id = perkuliahan.id_mata_kuliah
      WHERE mahasiswa.nim='${nim}'
      ORDER BY matkul.id ASC
      `)
      const matkul = result[0]
      return matkul
    }
    catch (error) {
      return Promise.reject(error)
    }
  }