import Subtugas from '../models/Subtugas'
import sequelize from '../db.js'
import db from '../db'

export const insertOneSubtugas = async (
  nama_subtugas,
  tenggat,
  status_subtugas,
  createdAt,
  updatedAt,
  id_tugas,
  id_studi
  ) => {
      try {
          const subtugas = await Subtugas.create({
              nama_subtugas,
              tenggat,
              status_subtugas,
              createdAt,
              updatedAt,
              id_tugas,
              id_studi
          })
          return subtugas
      }
          catch (error) {
          console.error(error)
      }
  }

  export const findSubtugasById = async (id_subtugas) => {
    try {
        const subtugas = await Subtugas.findByPk(id_subtugas)
        return subtugas
    }
    catch (error) {
        return Promise.reject(new Error('Find subtugas by id gagal'))
    }
}

export const findAllSubtugasById = async (id) => {
  try {
    const subtugas = await Subtugas.findAll({
      order: [['id', 'ASC']]
    })
    return subtugas
  } catch (error) {
    return Promise.reject(new Error('Get all Perkuliahan'))
  }
}

export const findSubtugasByTugas = async (id_tugas) => {
  try {
    const subtugas = await Subtugas.findAll({
      order: [['id','ASC']],
      where: {
        id_tugas: id_tugas
      }
    })
    return subtugas
  }
  catch (error) {
    return Promise.reject(new Error('Find subtugas by tugas gagal'))
  }
}

export const UpdateOneSubtugas = async (id_subtugas, nama_subtugas, tenggat, updatedAt) => {
  try {
    const subtugas = await Subtugas.findByPk(id_subtugas)
    subtugas.nama_subtugas = nama_subtugas
    subtugas.tenggat = tenggat
    subtugas.updatedAt = updatedAt
    await subtugas.save()
    return subtugas
  }
  catch (error) {
    return Promise.reject(new Error('Update subtugas gagal'))
  }
}

export const updateSubtugas = async (id, Progress, skalaPemahaman, Catatan) => {
  try {
    const subtugas = await Subtugas.update(
      {
        progress: Progress,
        skala_pemahaman: skalaPemahaman,
        catatan: Catatan,
      },
      {
        where: {
          id
        },
        silent: true
      }
    )
    return subtugas[0]
  } catch (error) {
      console.error(error)
  }
}

export const updateSubtugasLampiran = async (id, Lampiran) => {
  try {
    const subtugas = await Subtugas.update(
      {
        lampiran: Lampiran,
        status_subtugas: true,
      },
      {
        where: {
          id
        },
        silent: true
      }
    )
    return subtugas[0]
  } catch (error) {
    console.log(error)
  }
}

export const updateSubtugasDurasi = async (id, Durasi) => {
  try {
    const subtugas = await Subtugas.update(
      {
        durasi: Durasi
      },
      {
        where: {
          id
        },
        silent: true
      }
    )
    return subtugas[0]
  } catch (error) {
    console.log(error)
  }
}

export const findOneSubtugasById = async (id) => {
  try {
    const subtugas = await Subtugas.findAll({
      where: {
        id
      }
    })
    return subtugas[0]
  } catch (error) {
    console.error(error)
  }
}

export const getSubtugasByMahasiswa = async (nim) => {
  try {
    const result = await db.query(`
    SELECT subtugas.* FROM "Mahasiswa" mahasiswa
    INNER JOIN "Studi" studi ON studi.id_mahasiswa = mahasiswa.nim
    INNER JOIN "Subtugas" subtugas ON subtugas.id_studi = studi.id
    WHERE mahasiswa.nim='${nim}'
    ORDER by subtugas.id ASC;
    `)
    const tugas = result[0]
    return tugas
  }
  catch (error) {
    return Promise.reject(error)
  }
}