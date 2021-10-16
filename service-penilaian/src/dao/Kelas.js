import Kelas from '../models/Kelas'

export const findKelasByKodeKelas = async (kodeKelas) => {
  try {
    const kelas = await Kelas.findByPk(kodeKelas)
    return kelas
  } catch (error) {
    return Promise.reject(error)
  }
}