import MataKuliah from '../models/Mata_Kuliah'

export const findMataKuliahByIdMatkul = async (idMataKuliah) => {
  try {
    const mataKuliah = await MataKuliah.findByPk(idMataKuliah)
    return mataKuliah
  } catch (error) {
    return Promise.reject(error)
  }
}
