/*
  Catatan :  File ini berisi seluruh bussiness logic yang dapat dilakukan oleh mahasiswa
*/
import * as JadwalDAO from '../dao/Jadwal'
import * as KeteranganDAO from '../dao/Keterangan'
import * as DaftarHadirMahasiswaDAO from '../dao/DaftarHadirMahasiswa'
import schedule from 'node-schedule'
import { DateTime } from 'luxon'
import holiday from '../const/Liburan'

export const generateDaftarHadirMahasiswa = async () => {
  // Author : hafizmfadli
  // param: -
  // Output: daftar hadir hari ini untuk seluruh mahasiswa digenerate

  try {
    // hanya dijalankan ketika pertama kali app di run
    await DaftarHadirMahasiswaDAO.bikinDaftarHadirSeluruhMhsHariIni()
  } catch (error) {
    return Promise.reject(error)
  }
  schedule.scheduleJob('0 0 * * *', async () => {
    // akan dijalankan once a day jam 00:00
    try {
      await DaftarHadirMahasiswaDAO.bikinDaftarHadirSeluruhMhsHariIni()
    } catch (error) {
      return Promise.reject(error)
    }
  })
}

export const melakukanAbsensi = async (idStudi, idJadwal) => {
  // Author : hafizmfadli
  // param : idStudi (int), idJadwal (int)
  // Output : Mahasiswa dianggap hadir dengan keterlambatannya telah dihitung
  // return : rows updated

  try {
    const jadwal = await JadwalDAO.findJadwalById(idJadwal)
    // presensi dapat dilakukan ketika
    // 30 menit sebelum perkuliaham dimulai
    // sampai batas akhir waktu perkuliahan
    const now = DateTime.now()
    const tglHariIni = now.toISODate()

    // const result
    let keterlambatan = 0
    const toleransiKeterlambatan = DateTime.fromISO(
      `${tglHariIni}T${jadwal[0].batas_terakhir_absen}`
    )
    if (now > toleransiKeterlambatan) {
      // terlambat melakukan presensi
      const keterlambatanInMs = now
        .diff(toleransiKeterlambatan)
        .toObject().milliseconds
      keterlambatan = Math.round(keterlambatanInMs / 1000 / 60) // convert ke menit
    }
    // update kehadiran
    const result = await DaftarHadirMahasiswaDAO.updateStatusKehadiranMhs(
      idStudi,
      keterlambatan,
      tglHariIni,
      true,
      jadwal[0].ja,
      jadwal[0].jb,
      null
    )
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

const isLiburan = (tgl) => {
  // author : hafizmfadli
  // params : tgl (yyyy-mm-dd : string)
  const date = new Date(tgl)
  if (date.getDay() === 0 || date.getDay() === 6) {
    // sabtu - minggu libur sayang
    return true
  }

  const liburgaknih = holiday.filter((date) => {
    return date.tanggal === tgl
  })
  return liburgaknih.length > 0
}

const keteranganLibur = (tgl) => {
  // author : hafizmfadli
  // params : tgl (yyyy-mm-dd : string)
  // return : keterangan libur
  const date = new Date(tgl)
  if (date.getDay() === 0 || date.getDay() === 6) {
    // sabtu - minggu libur sayang
    return 'hari libur kuliah'
  }

  const liburgaknih = holiday.filter((date) => {
    return date.tanggal === tgl
  })
  return liburgaknih[0].keterangan
}

export const ajukanIzin = async (idJadwals, status, url, nim, tglIzin) => {
  // ide :
  // insert keterangan terlebih dahulu (karena kita butuh id nya)
  // id_keterangan dan id studi akan menjadi FK pada tabel daftar_hadir_mhs

  // Input:
  // idStudies : array of id_studi
  // status : char (i = izin, s = sakit, a = alfa)
  // urgl : string (url image surat izin)
  // tgl : yyyy-mm-dd (string)

  // Output :
  // data daftar hadir berhasil disimpan di db
  // return daftar daftar hadir mahasiswa yang mengajukan izin

  try {
    if (isLiburan(tglIzin)) {
      const ket = keteranganLibur(tglIzin)
      const error = new Error('Tanggal tidak valid')
      error.statusCode = 400
      error.cause = `${tglIzin} adalah hari libur, ${ket}`
      throw error
    }

    const keterangan = await KeteranganDAO.insertKeterangan(
      nim,
      status,
      url,
      -1
    )
    const tglIzinDate = new Date(tglIzin)
    const minggu = DaftarHadirMahasiswaDAO.calculateWeekOfMonth(
      tglIzinDate.getDate()
    )
    const bulan = tglIzinDate.getMonth() + 1

    // get seluruh jadwal pada hari yang diajukan izin
    const jadwals = await JadwalDAO.getJadwalMhsHrTertentu(
      nim,
      tglIzinDate.getDay()
    )

    const results = []
    await Promise.all(
      jadwals.map(async (jadwal) => {
        if (idJadwals.includes(`${jadwal.id_jadwal}`)) {
          // cek apakah sudah punya daftar hadir
          const isPunya = await DaftarHadirMahasiswaDAO.isSudahPunyaDaftarHadir(
            jadwal.id_studi,
            tglIzin,
            jadwal.ja,
            jadwal.jb
          )

          let result
          if (isPunya) {
            // kalo udah punya artinya dia izin untuk hari ini, cukup update yg sudah ada
            result = await DaftarHadirMahasiswaDAO.updateStatusKehadiranMhs(
              jadwal.id_studi,
              0,
              tglIzin,
              false,
              jadwal.ja,
              jadwal.jb,
              keterangan.dataValues.id_keterangan
            )
          } else {
            // kalo belum punya artinya dia izin dihari yg akan datang, insert row baru
            result = await DaftarHadirMahasiswaDAO.insertOne(
              jadwal.id_studi,
              keterangan.dataValues.id_keterangan,
              0,
              tglIzin,
              false,
              minggu,
              bulan,
              jadwal.ja,
              jadwal.jb
            )
            result = [result.dataValues]
          }
          results.push(result[0])
          return result
        }
      })
    )
    return results
  } catch (error) {
    return Promise.reject(error)
  }
}
