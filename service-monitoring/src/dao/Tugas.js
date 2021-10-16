import Tugas from '../models/Tugas'
import sequelize from '../db.js'
import db from '../db'

export const insertOneTugas = async (
    nama_tugas,
    status_progress,
    status_durasi,
    status_skala,
    status_catatan,
    status_lampiran,
    createdAt,
    updatedAt,
    id_perkuliahan,
    nip
    ) => {
        try {
            const tugas = await Tugas.create({
                nama_tugas,
                status_progress,
                status_durasi,
                status_skala,
                status_catatan,
                status_lampiran,
                createdAt,
                updatedAt,
                id_perkuliahan,
                nip
            })
            return tugas
        }
            catch (error) {
            console.error(error)
        }
    }

export const findTugasById = async (id_tugas) => {
    try {
        const tugas = await Tugas.findByPk(id_tugas)
        return tugas
    }
    catch (error) {
        return Promise.reject(new Error('Find tugas by id gagal'))
    }
}

export const findTugasByPerkuliahan = async (id) => {
    try {
        const tugas = await Tugas.findAll({
            where: {
              id_perkuliahan: id
            }
          })
        return tugas
    }
    catch (error) {
        return Promise.reject(new Error('Find tugas by id gagal'))
    }
}

export const getAllTugasMahasiswa = async (nim) => {
    try {
      const result = await db.query(`
      SELECT DISTINCT tugas.* FROM "Mahasiswa" mahasiswa
      INNER JOIN "Studi" studi ON studi.id_mahasiswa = mahasiswa.nim
      INNER JOIN "Subtugas" subtugas ON subtugas.id_studi = studi.id
      INNER JOIN "Tugas" tugas ON tugas.id = subtugas.id_tugas
      WHERE mahasiswa.nim='${nim}';
      `)
      const tugas = result[0]
      return tugas
    }
    catch (error) {
        return Promise.reject(error)
    }
  }

  export const getAllTugasMahasiswaByid_tugas = async(id_tugas) => {
    try {
        const result = await db.query(`
        SELECT mahasiswa.nim FROM "Tugas" tugas
        INNER JOIN "Perkuliahan" perkuliahan ON perkuliahan.id = tugas.id_perkuliahan
        INNER JOIN "Studi" studi ON studi.id_perkuliahan = perkuliahan.id
        INNER JOIN "Mahasiswa" mahasiswa ON mahasiswa.nim = studi.id_mahasiswa
        WHERE tugas.id=${id_tugas};
        `)
        const mahasiswa = result[0]
        return mahasiswa
    }
    catch (error) {
        return Promise.reject(error)
    }
}

// export const findTugasByIdMahasiswa = async (id_mahasiswa) => {
//     try {
//         const tugas = await Tugas.findAll({
//             where: {
//                 id_mahasiswa
//             }
//         })
//         return tugas
//     }
//     catch (error) {
//         return Promise.reject(new Error('Find tugas by id gagal'))
//     }
// }