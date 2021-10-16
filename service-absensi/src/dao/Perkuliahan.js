import Perkuliahan from '../models/Perkuliahan'
import db from '../db'

export const findPerkuliahanByIdPerkuliahan = async (idPerkuliahan) => {
  try {
    const perkuliahan = await db.query(`SELECT * FROM "Perkuliahan" WHERE id=${idPerkuliahan};`)
    return perkuliahan
  } catch (error) {
    return Promise.reject(error)
  }
}

export const findPerkuliahanByIdMatkulAndKodeKelas = async (idMataKuliah, kodeKelas) => {
  try {
    const perkuliahan = await Perkuliahan.findAll({
      where: {
        idMataKuliah,
        kodeKelas
      }
    })
    return perkuliahan
  } catch (error) {
    return Promise.reject(error)
  }
}
