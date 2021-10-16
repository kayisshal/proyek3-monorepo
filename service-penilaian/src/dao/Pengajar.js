import Pengajar from '../models/Pengajar'
import sequelize from '../db.js'

export const findPengajarByNIP = async (NIP) => {
    try {
      const dosen = await Pengajar.findAll({
        where: {
          nip: NIP
        }
      })
      return dosen
    } catch (error) {
      return Promise.reject(new Error('Find Pengajar by NIP gagal'))
    }
  }