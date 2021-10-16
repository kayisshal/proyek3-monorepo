import Perkuliahan from '../models/Perkuliahan'
import Matkul from '../models/Mata_Kuliah'
import sequelize from '../db.js'

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
export const findPerkuliahanByListId = async (listId) => {
  try {
    const perkuliahan = await Perkuliahan.findAll({
      where: {
        id: listId
      }
    })
    return perkuliahan
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