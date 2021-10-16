import Dosen from '../models/Dosen.js'
import Perkuliahan from '../models/Perkuliahan.js'
import Kelas from '../models/Kelas.js'
import Mata_Kuliah from '../models/Mata_Kuliah.js'
import Pengajar from '../models/Pengajar.js'
import sequelize from '../db.js'

/*
    CATATAN :
  1.File ini berisi seluruh function yang mengakses database
  untuk mendapatkan data yang berkaitan dengan dosen
*/

export const insertOneDosen = async (NIP, namaDosen, idJabatan) => {
  try {
    const dosen = await Dosen.create({
      nip: NIP,
      nama_dosen: namaDosen,
      id_jabatan: idJabatan
    })
    return dosen
  } catch (error) {
    console.log(error)
  }
}

export const findDosenByNIP = async (NIP) => {
  try {
    const dosen = await Dosen.findAll({
      where: {
        NIP
      }
    })
    return dosen[0]
  } catch (error) {
    return Promise.reject(new Error('Find dosen by NIP gagal'))
  }
}

export const findAllDosen = async () => {
  try {
    const dosen = await Dosen.findAll()
    return dosen
  } catch (error) {
    return Promise.reject(new Error('Find all dosen gagal'))
  }
}

export const findDosenByJabatan = async (jabatanDosen) => {
  try {
    if (jabatanDosen === '') {
      jabatanDosen = null
      const dosenNoJabatan = await Dosen.findAll({
        where: {
          jabatan: null
        },
        order: [['nama_dosen', 'ASC']]
      })
      return dosenNoJabatan
    }
    const dosen = await Dosen.findAll({
      where: {
        jabatan: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('jabatan')),
          'LIKE',
          '%' + jabatanDosen.toLowerCase() + '%'
        )
      },
      order: [['nama_dosen', 'ASC']]
    })
    return dosen
  } catch (error) {
    return Promise.reject(new Error('Find dosen by jabatan gagal'))
  }
}

export const destroyDosenByNip = async (NIP) => {
  try {
    const dosen = await Dosen.destroy({
      where: {
        NIP
      }
    })
    return dosen
  } catch (error) {
    return Promise.reject(new Error('Delete dosen by NIP gagal'))
  }
}

export const getPerkuliahanDosen = async (nip) => {
  try {
    const result = await Dosen.findOne({
      where: {nip: nip},
      include: Perkuliahan
    })
    // const result = await Pengajar.findOne({
    //     where: {nip: nip},
    //     include: Perkuliahan
    //   })
    return result
  } catch (error) {
    return Promise.reject(new Error('Get Perkuliahan Dosen gagal'))
  }
}