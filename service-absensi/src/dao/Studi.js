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
        idPerkuliahan
      }
    })
    return studi
  } catch (error) {
    return Promise.reject(error)
  }
}
