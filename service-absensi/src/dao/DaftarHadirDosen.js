import DaftarHadirDosen from '../models/DaftarHadirDosen'
import * as DosenDAO from './Dosen'
import * as JadwalDAO from './Jadwal'
import db from '../db'

export const insertOne = async (nip, idStudi, tanggal, isHadir, idJadwal) => {
  // Belum dicoba karena membutuhkan data dari db common
  try {
    const result = await DaftarHadirDosen.create({
      nip,
      id_studi: idStudi,
      tanggal,
      isHadir,
      idJadwal
    })
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const findDaftarHadirDosenByNIPAndIdStudi = async (nip, idStudi) => {
  try {
    const daftarHadirDosen = await DaftarHadirDosen.findAll({
      where: {
        nip,
        idStudi
      }
    })
    return daftarHadirDosen
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateStatusKehadiranDosen = async (nip, idStudi, tanggal, isHadir, idJadwal) => {
  try {
    const result = await db.query(`
    UPDATE "daftar_hadir_dosen" SET "isHadir" = ${isHadir} WHERE (nip='${nip}' AND id_studi=${idStudi} AND tanggal='${tanggal}' AND "idJadwal"=${idJadwal}) RETURNING *;
    `)
    const rows = result[0]
    return rows
  } catch (error) {
    return Promise.reject(error)
  }
}

export const isSudahPunyaDaftarHadir = async (nip, tanggal, idJadwal) => {
  try {
    const result = await db.query(`
    SELECT * FROM "daftar_hadir_dosen" WHERE nip='${nip}' AND tanggal='${tanggal}' AND "idJadwal"=${idJadwal};
    `)
    const rows = result[0]
    return rows.length > 0
  } catch (error) {
    return Promise.reject(error)
  }
}

export const bikinDaftarHadirSeluruhDosenHariIni = async () => {
  // Author : hafizmfadli
  // param : -
  // return : -
  // FS : daftar hadir seluruh mahasiswa untuk setiap matkul hari ini telah siap

  // Catatan :
  // Fungsi ini harus dipanggil satu kali sehari
  // untuk inisiasi daftar hadir mahasiswa

  // Bikin daftar hadirnya jadngan berdasarkan matkul, tapi berdasarkan jadwal ngab
  try {
    const date = new Date()
    const tglHariIni = `${date.getFullYear()}-${(date.getMonth() + 1) <= 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)}-${date.getDate() <= 9 ? ('0' + date.getDate()) : date.getDate()}`
    const allDosen = await DosenDAO.findAllDosen()
    allDosen.forEach(async (dosen) => {
      const jadwalHariIni = await JadwalDAO.getJadwalDosenHrTertentu(dosen.nip, date.getDay())
      await Promise.all(jadwalHariIni.map(async (jadwal) => {
        const isPunya = await isSudahPunyaDaftarHadir(dosen.nip, tglHariIni, jadwal.id_jadwal)
        if (!isPunya) {
          // bikin daftar hadir untuk setiap jadwal hari ini
          await insertOne(dosen.nip, jadwal.id_studi, tglHariIni, false, jadwal.id_jadwal)
          // console.log(result)
        }
      })
      )
    })
    return true
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getByNipJadwalTgl = async (nip, idJadwal, tanggal) => {
  // Author : raihanibrhm
  // param : nip (string), idJadwal (int), tanggal (yyyy-mm-dd : string)
  // return : daftar hadir dosen dgn nip, idJadwal, tanggal ybs

  try {
    const result = await db.query(`
    SELECT DISTINCT dosen.nip, dosen.nama_dosen, dhd.* FROM "daftar_hadir_dosen" dhd
    INNER JOIN "Dosen" dosen ON dosen.nip = dhd.nip
    WHERE dhd.tanggal='${tanggal}' AND dhd.nip='${nip}' AND dhd."idJadwal"=${idJadwal} ORDER BY id_daftar_hadir_dosen ASC
    `)
    const rows = result[0]
    return rows
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getPersentaseMengajarByNip = async (nip) => {
  try {
    const queryResult1 = await db.query(`
    SELECT * FROM public.daftar_hadir_dosen
WHERE nip='${nip}' AND "isHadir"='true'
ORDER BY id_daftar_hadir_dosen ASC 
    `)

    const queryResult2 = await db.query(`
    SELECT * FROM public.daftar_hadir_dosen
WHERE nip='${nip}'
ORDER BY id_daftar_hadir_dosen ASC
    `)
    const result1 = queryResult1[0].length
    const result2 = queryResult2[0].length
    const persentaseMengajarDosen = (result1 / result2) * 100
    const result = {
      persentaseMengajarDosen: persentaseMengajarDosen
    }

    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getTotalJamMengajarByNip = async (nip) => {
  try {
    const queryResult1 = await db.query(`
    SELECT dhd.*, jadwal.ja, jadwal.jb FROM "daftar_hadir_dosen" dhd
INNER JOIN "Jadwal" jadwal ON jadwal.id_jadwal = dhd."idJadwal"
WHERE dhd.nip='${nip}'
ORDER BY id_daftar_hadir_dosen ASC
    `)

    const queryResult2 = await db.query(`
    SELECT dhd.*, jadwal.ja, jadwal.jb FROM "daftar_hadir_dosen" dhd
INNER JOIN "Jadwal" jadwal ON jadwal.id_jadwal = dhd."idJadwal"
WHERE dhd.nip='${nip}' AND dhd."isHadir"='true'
ORDER BY id_daftar_hadir_dosen ASC
    `)

    const queryResult3 = await db.query(`
    SELECT dhd.*, jadwal.ja, jadwal.jb FROM "daftar_hadir_dosen" dhd
INNER JOIN "Jadwal" jadwal ON jadwal.id_jadwal = dhd."idJadwal"
WHERE dhd.nip='${nip}' AND dhd."isHadir"='false'
ORDER BY id_daftar_hadir_dosen ASC
    `)

    // Hitung total seluruh jam
    let i
    let totalSeluruhJam = 0
    for (i = 0; i < queryResult1[0].length; i++) {
      totalSeluruhJam += queryResult1[0][i].jb - queryResult1[0][i].ja
    }

    // Hitung total jam mengajar
    let totalJamMengajar = 0
    for (i = 0; i < queryResult2[0].length; i++) {
      totalJamMengajar += queryResult2[0][i].jb - queryResult2[0][i].ja
    }

    // Hitung total jam tidak mengajar
    let totalJamTidakMengajar = 0
    for (i = 0; i < queryResult3[0].length; i++) {
      totalJamTidakMengajar += queryResult3[0][i].jb - queryResult3[0][i].ja
    }

    // Hitung persentase jam mengajar
    const persentaseJamMengajarDosen = (totalJamMengajar / totalSeluruhJam) * 100
    const result = {
      totalSeluruhJam: totalSeluruhJam,
      totalJamMengajar: totalJamMengajar,
      totalJamTidakMengajar: totalJamTidakMengajar,
      persentaseJamMengajarDosen: persentaseJamMengajarDosen
    }

    return result
  } catch (error) {
    return Promise.reject(error)
  }
}
