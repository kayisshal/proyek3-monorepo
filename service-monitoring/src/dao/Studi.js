import Studi from '../models/Studi'

export const findStudiByIdStudi = async (idStudi) => {
  try {
    const studi = await Studi.findByPk(idStudi)
    return studi
  } catch (error) {
    return Promise.reject(error)
  }
}

export const findStudiByIdPerkuliahan = async (idPerkuliahan) => {
  try {
    const studi = await Studi.findAll({
      where: {
        id_perkuliahan : idPerkuliahan
      }
    })
    return studi
  } catch (error) {
    return Promise.reject(error)
  }
}

export const findStudiByIdMahasiswa = async (idMahasiswa) => {
  try {
    const studi = await Studi.findAll({
      where: {
        id_mahasiswa : idMahasiswa
      }
    })
    return studi
  } catch (error) {
    return Promise.reject(error)
  }
}