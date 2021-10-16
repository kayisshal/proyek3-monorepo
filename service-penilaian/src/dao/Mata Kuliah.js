import MataKuliah from '../models/Mata_Kuliah'
import sequelize from '../db.js'

export const findMatkulById = async (id) => {
    try {
      const matkul = await MataKuliah.findAll({
        where: {
          id: id
        }
      })
      return matkul[0]
    } catch (error) {
      return Promise.reject(new Error('Find Pengajar by NIP gagal'))
    }
  }