import Studi from '../models/Studi'
import sequelize from '../db.js'

export const findStudiByIdPerkuliahan = async (idPerkuliahan) => {
    try {
      const studi = await Studi.findAll({
        where: {
          id_perkuliahan: idPerkuliahan
        },
        order: [
          ['id_mahasiswa', 'ASC']
      ],
      })
      return studi
    } catch (error) {
      return Promise.reject(new Error('Find Studi By Perkuliahan gagal'))
    }
}

export const updateNilaiAkhirByNimPerkuliahan = async (nim, idPerkuliahan, nilai) => {
    try {
        const nilaiAkhir = await Studi.update(nilai, {
          where: {
            id_mahasiswa: nim,
            id_perkuliahan: idPerkuliahan
          }
        })
        return nilaiAkhir
        console.log(nilaiAkhir)
      } catch (error) {
        return Promise.reject(new Error('Update Nilai Akhir gagal'))
      }
}
export const findStudiByNIM = async (nim) => {
  try {
    const studi = await Studi.findAll({
      where: {
        id_mahasiswa: nim
      },
      order: [
        ['id_perkuliahan', 'ASC']
    ],
    })
    return studi
  } catch (error) {
    return Promise.reject(new Error('Find Studi By NIM gagal'))
  }
}