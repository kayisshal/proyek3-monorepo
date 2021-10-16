import DaftarHadirMahasiswa from '../models/DaftarHadirMahasiswa'
import * as MahasiswaDAO from './Mahasiswa'
import * as JadwalDAO from './Jadwal'
import db from '../db'

export const insertOne = async (idStudi, idKeterangan, keterlambatan, tanggal, isHadir, minggu, bulan, ja, jb) => {
  // Belum melibatkan db common
  try {
    const result = await DaftarHadirMahasiswa.create({
      id_studi: idStudi,
      id_keterangan: idKeterangan,
      keterlambatan,
      tanggal,
      isHadir,
      minggu,
      bulan,
      ja,
      jb
    })

    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const findDaftarHadirMahasiswaByNIMAndIdStudi = async (nim, idStudi) => {
  try {
    const daftarHadirMahasiswa = await DaftarHadirMahasiswa.findAll({
      where: {
        nim,
        idStudi
      }
    })
    return daftarHadirMahasiswa
  } catch (error) {
    return Promise.reject(error)
  }
}

export const isSudahPunyaDaftarHadir = async (idStudi, tanggal, ja, jb) => {
  try {
    const result = await db.query(`
    SELECT * FROM "daftar_hadir_mahasiswa" WHERE id_studi=${idStudi} AND ja=${ja} AND jb=${jb} AND tanggal='${tanggal}';
    `)
    const rows = result[0]
    return rows.length > 0
  } catch (error) {
    return Promise.reject(error)
  }
}

export const bikinDaftarHadirSeluruhMhsHariIni = async () => {
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
    const allMhs = await MahasiswaDAO.findAllMahasiswa()
    // console.log("MAHASISWA SAYANG", allMhs);
    allMhs.forEach(async (mhs) => {
      const matkulHariIni = await JadwalDAO.getJadwalMhsHrTertentu(mhs.nim, date.getDay())
      await Promise.all(matkulHariIni.map(async (matkul) => {
        const isPunya = await isSudahPunyaDaftarHadir(matkul.id_studi, tglHariIni, matkul.ja, matkul.jb)
        if (!isPunya) {
          // bikin daftar hadir untuk setiap matkul hari ini
          await insertOne(matkul.id_studi, null, 0, tglHariIni, false, calculateWeekOfMonth(date.getDate()), date.getMonth() + 1, matkul.ja, matkul.jb)
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

export const calculateWeekOfMonth = (tgl) => {
  const week = Math.ceil(tgl / 7)
  return week > 4 ? 4 : week
}

export const getDaftarHadirKelasJadwal = async (kodeKelas, idJadwal, tanggal) => {
  // Author : hafizmfadli
  // Fungsi ini digunakan oleh dosen pengampu ketika mau liat daftar hadir pada matkul yang sedang dia ajar
  // Param : kodeKelas, hari, idJadwal, tanggal (yyyy-mm-dd)
  // return : daftar hadir mhs pada suatu kelas, jadwal, dan hari tertentu

  try {
    const date = new Date(tanggal)
    const hari = date.getDay()
    const result = await db.query(`
    SELECT mhs.nim, mhs.nama, mhs.kode_kelas, p.id AS id_perkuliahan, mk.id, s.id AS id_studi, j.id_jadwal, mk.nama_mata_kuliah, d.nama_dosen, dhm.tanggal, j.batas_terakhir_absen, j.id_jadwal, dhm."isHadir",
    dhm.id_daftar_hadir_mhs, dhm.keterlambatan, dhm.id_keterangan, ket.status, ket."isAccepted" FROM "Jadwal" j
    INNER JOIN "Perkuliahan" p ON p.id = j.id_perkuliahan
    INNER JOIN "Studi" s ON p.id = s.id_perkuliahan
    INNER JOIN "daftar_hadir_mahasiswa" dhm ON dhm.id_studi = s.id AND dhm.ja = j.ja AND dhm.jb = j.jb
    INNER JOIN "Mahasiswa" mhs ON mhs.nim = s.id_mahasiswa
    INNER JOIN "Mata_Kuliah" mk ON mk.id = p.id_mata_kuliah
    INNER JOIN "Dosen" d ON d.nip = j.nip
    LEFT JOIN "Keterangan" ket ON ket.id_keterangan = dhm.id_keterangan
    WHERE j.hari=${hari} AND p.kode_kelas=${kodeKelas} AND j.id_jadwal=${idJadwal} AND dhm.tanggal='${tanggal}'
    ORDER BY mhs.nim ASC;
    `)
    const resultRow = result[0]
    const mahasiswa = resultRow.map(mhs => {
      // ambil informasti ttg status hadir mahasiswa saja
      let status = mhs.isHadir === true ? 'Sudah Absen' : 'Belum absen'

      // sudah mengajukan izin namun belum di acc
      if (!mhs.isHadir && mhs.id_keterangan && mhs.isAccepted === -1) {
        status = 'Izin yang diajukan sedang diperiksa waldos'
      }
      // sudah mengajukan izin dan sudah di acc oleh waldos
      if (!mhs.isHadir && mhs.id_keterangan && mhs.isAccepted === 1) {
        status = mhs.status
      }
      // sudah mengajukan izin namun tidak di acc oleh waldos
      if (!mhs.isHadir && mhs.id_keterangan && mhs.isAccepted === 0) {
        status = 'Tidak Hadir'
      }

      return {
        id_studi: mhs.id_studi,
        nim: mhs.nim,
        nama: mhs.nama,
        isHadir: mhs.isHadir,
        status,
        id_daftar_hadir: mhs.id_daftar_hadir_mhs,
        keterlambatan: mhs.keterlambatan
      }
    })

    const resultPretty = {
      // rapihin dulu
      id_jadwal: resultRow[0].id_jadwal,
      id_perkuliahan: resultRow[0].id_perkuliahan,
      nama_mata_kuliah: resultRow[0].nama_mata_kuliah,
      kode_kelas: resultRow[0].kode_kelas,
      dosen: resultRow[0].nama_dosen,
      tanggal: resultRow[0].tanggal,
      batas_terakhir_absen: resultRow[0].batas_terakhir_absen,
      mahasiswa
    }

    return resultPretty
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateStatusKehadiranMhsByID = async (idDaftarHadirMhs, isHadir) => {
  try {
    const result = await db.query(`
    UPDATE "daftar_hadir_mahasiswa" SET "isHadir" = ${isHadir} WHERE id_daftar_hadir_mhs = ${idDaftarHadirMhs} RETURNING *;
    `)
    const rows = result[0]
    return rows
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateStatusKehadiranMhs = async (idStudi, keterlambatan, tanggal, isHadir, ja, jb, idKeterangan) => {
  // Author : Hafiz
  // param : idStudi (int), tanggal (string : 'yyyy-mm-dd'), isHadir (boolean), ja (int), jb(int)
  // Output : nilai field isHadir pada tabel daftar_hadir_mahasiswa terupdate
  // return : rows yang telah diupdated
  try {
    const result = await db.query(`
    UPDATE "daftar_hadir_mahasiswa" SET "isHadir" = ${isHadir}, keterlambatan = ${keterlambatan}, id_keterangan = ${idKeterangan} WHERE (id_studi=${idStudi} AND tanggal='${tanggal}' AND ja=${ja} AND jb=${jb}) RETURNING *;
    `)
    const rows = result[0]
    return rows
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateIsHadirMhs = async (idStudi, tanggal, ja, jb, isHadir) => {
  try {
    const result = await db.query(`
    UPDATE "daftar_hadir_mahasiswa" SET "isHadir" = ${isHadir} WHERE (id_studi=${idStudi} AND tanggal='${tanggal}' AND ja=${ja} AND jb=${jb}) RETURNING *;
    `)
    const rows = result[0]
    return rows
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getByNimJadwalTgl = async (nim, idJadwal, tanggal) => {
  // Author : hafizmfadli
  // param : nim (string), idJadwal (int), tanggal (yyyy-mm-dd : string)
  // return : daftar hadir mhs dgn nim, idJadwal, tanggal ybs

  try {
    const result = await db.query(`
    SELECT mhs.nim, mhs.nama, dhm.* FROM "daftar_hadir_mahasiswa" dhm
    INNER JOIN "Studi" s ON s.id = dhm.id_studi
    INNER JOIN "Perkuliahan" p ON p.id= s.id_perkuliahan
    INNER JOIN "Jadwal" j ON j.id_perkuliahan = p.id AND dhm.ja = j.ja AND dhm.jb = j.jb
    INNER JOIN "Mahasiswa" mhs ON mhs.nim = s.id_mahasiswa
    WHERE dhm.tanggal='${tanggal}' AND mhs.nim='${nim}' AND j.id_jadwal=${idJadwal}
    `)
    const rows = result[0]
    return rows
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getByNimTgl = async (nim, tanggal) => {
  try {
    const result = await db.query(`
    SELECT DISTINCT dhm.* FROM "daftar_hadir_mahasiswa" dhm
    INNER JOIN "Studi" s ON s.id = dhm.id_studi
    INNER JOIN "Perkuliahan" p ON p.id= s.id_perkuliahan
    INNER JOIN "Jadwal" j ON j.id_perkuliahan = p.id AND dhm.ja = j.ja AND dhm.jb = j.jb
    INNER JOIN "Mahasiswa" mhs ON mhs.nim = s.id_mahasiswa
    WHERE dhm.tanggal='${tanggal}' AND mhs.nim='${nim}'
    `)
    const rows = result[0]
    return rows
  } catch (error) {
    return Promise.reject(error)
  }
}

// export const updateKehadiranDanKeterlambatan = async (isHadir, keterlambatan, idStudi, tanggal) => {

//   // Author : hafizmfadli
//   // param: isHadir (boolean), keterlambatan (int), idStudi (int), tanggal (string : 'yyyy-mm-dd')
//   // Output : nilai isHadir dan keterlambatan diperbarui
//   // return : rows yang telah diupdate

//   try {
//     const result = await db.query(`
//     UPDATE "daftar_hadir_mahasiswa" SET "isHadir" = ${isHadir}, keterlambatan = ${keterlambatan} WHERE id_studi=${idStudi} AND tanggal='${tanggal}' RETURNING *
//     `)
//     const rows = result[0]
//     return rows
//   } catch (error) {
//     return Promise.reject(error)
//   }
// }

export const getKeteranganSakitByNim = async (nim) => {
  try {
    const queryResult = await db.query(`
    SELECT k.*, dhm.ja, dhm.jb FROM "daftar_hadir_mahasiswa" dhm
INNER JOIN "Keterangan" k ON k.id_keterangan = dhm.id_keterangan
    WHERE dhm."isHadir"='false' AND k.nim='${nim}' AND k.status='sakit' AND k."isAccepted"=1
    `)
    const rows = queryResult[0]
    let i
    let result = 0
    for (i = 0; i < rows.length; i++) {
      result += rows[i].jb - rows[i].ja
    }

    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getKeteranganIzinByNim = async (nim) => {
  try {
    const queryResult = await db.query(`
    SELECT k.*, dhm.ja, dhm.jb FROM "daftar_hadir_mahasiswa" dhm
INNER JOIN "Keterangan" k ON k.id_keterangan = dhm.id_keterangan
    WHERE dhm."isHadir"='false' AND k.nim='${nim}' AND k.status='izin' AND k."isAccepted"=1
    `)
    const rows = queryResult[0]
    let i
    let result = 0
    for (i = 0; i < rows.length; i++) {
      result += rows[i].jb - rows[i].ja
    }

    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getKeteranganAlfaByNim = async (nim) => {
  try {
    const queryResult1 = await db.query(`
    SELECT DISTINCT dhm.* FROM "daftar_hadir_mahasiswa" dhm
    INNER JOIN "Studi" s ON s.id = dhm.id_studi
    INNER JOIN "Perkuliahan" p ON p.id= s.id_perkuliahan
    INNER JOIN "Jadwal" j ON j.id_perkuliahan = p.id AND dhm.ja = j.ja AND dhm.jb = j.jb
    INNER JOIN "Mahasiswa" mhs ON mhs.nim = s.id_mahasiswa
    WHERE dhm."isHadir"='false' AND dhm.id_keterangan IS NULL AND mhs.nim='${nim}'
ORDER BY id_daftar_hadir_mhs ASC 
    `)

    const queryResult2 = await db.query(`
    SELECT k.*, dhm.ja, dhm.jb FROM "daftar_hadir_mahasiswa" dhm
    INNER JOIN "Keterangan" k ON k.id_keterangan = dhm.id_keterangan
    WHERE k.nim='${nim}' AND k."isAccepted"!=1
    `)
    const rows1 = queryResult1[0]
    const rows2 = queryResult2[0]
    let i
    let result = 0
    for (i = 0; i < rows1.length; i++) {
      result += rows1[i].jb - rows1[i].ja
    }
    for (i = 0; i < rows2.length; i++) {
      result += rows2[i].jb - rows2[i].ja
    }

    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getPersentaseKehadiranByNim = async (nim) => {
  try {
    const queryResult1 = await db.query(`
    SELECT DISTINCT dhm.* FROM "daftar_hadir_mahasiswa" dhm
    INNER JOIN "Studi" s ON s.id = dhm.id_studi
    INNER JOIN "Perkuliahan" p ON p.id= s.id_perkuliahan
    INNER JOIN "Jadwal" j ON j.id_perkuliahan = p.id AND dhm.ja = j.ja AND dhm.jb = j.jb
    INNER JOIN "Mahasiswa" mhs ON mhs.nim = s.id_mahasiswa
    WHERE dhm."isHadir"='true' AND mhs.nim='${nim}'
ORDER BY id_daftar_hadir_mhs ASC
    `)

    const queryResult2 = await db.query(`
    SELECT DISTINCT dhm.* FROM "daftar_hadir_mahasiswa" dhm
    INNER JOIN "Studi" s ON s.id = dhm.id_studi
    INNER JOIN "Perkuliahan" p ON p.id= s.id_perkuliahan
    INNER JOIN "Jadwal" j ON j.id_perkuliahan = p.id AND dhm.ja = j.ja AND dhm.jb = j.jb
    INNER JOIN "Mahasiswa" mhs ON mhs.nim = s.id_mahasiswa
    WHERE mhs.nim='${nim}'
ORDER BY id_daftar_hadir_mhs ASC
    `)
    const result1 = queryResult1[0].length
    const result2 = queryResult2[0].length
    const rows1 = queryResult1[0]
    let i
    let jumlahJamHadir = 0
    for (i = 0; i < rows1.length; i++) {
      jumlahJamHadir += rows1[i].jb - rows1[i].ja
    }
    const persentaseKehadiran = (result1 / result2) * 100
    const result = {
      persentaseKehadiran: persentaseKehadiran,
      jumlahJamHadir: jumlahJamHadir
    }

    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getTotalJamSPbyNim = async (nim) => {
  try {
    const queryResult1 = await getKeteranganAlfaByNim(nim)
    const totalJamTidakMasuk = queryResult1
    const totalJamUntukSP1 = 10
    const totalJamUntukSP2 = 20
    const totalJamUntukSP3 = 30
    const totalJamUntukSuratPemberhentian = 38
    let result
    if (totalJamTidakMasuk <= 10) {
      const jamTersisaUntukSP1 = totalJamUntukSP1 - totalJamTidakMasuk
      result = {
        totalJamTidakMasuk: totalJamTidakMasuk,
        jamTersisa: jamTersisaUntukSP1,
        status: 'Tidak ada SP'
      }
    } else if (totalJamTidakMasuk <= 20) {
      const jamTersisaUntukSP2 = totalJamUntukSP2 - totalJamTidakMasuk
      result = {
        totalJamTidakMasuk: totalJamTidakMasuk,
        jamTersisa: jamTersisaUntukSP2,
        status: 'SP 1'
      }
    } else if (totalJamTidakMasuk <= 30) {
      const jamTersisaUntukSP3 = totalJamUntukSP3 - totalJamTidakMasuk
      result = {
        totalJamTidakMasuk: totalJamTidakMasuk,
        jamTersisa: jamTersisaUntukSP3,
        status: 'SP 2'
      }
    } else if (totalJamTidakMasuk <= 38) {
      const jamTersisaUntukSuratPemberhentian = totalJamUntukSuratPemberhentian - totalJamTidakMasuk
      result = {
        totalJamTidakMasuk: totalJamTidakMasuk,
        jamTersisa: jamTersisaUntukSuratPemberhentian,
        status: 'SP 3'
      }
    } else {
      const jamTersisaUntukSuratPemberhentian = 0
      result = {
        totalJamTidakMasuk: totalJamTidakMasuk,
        jamTersisa: jamTersisaUntukSuratPemberhentian,
        status: 'Dikenakan surat pemberhentian dari Polban'
      }
    }

    return result
  } catch (error) {
    return Promise.reject(error)
  }
}
