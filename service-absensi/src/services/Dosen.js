/*
  Catatan :  File ini berisi seluruh bussiness logic yang dapat dilakukan oleh mahasiswa
*/
import * as DaftarHadirDosenDAO from '../dao/DaftarHadirDosen'
import * as JadwalDAO from '../dao/Jadwal'
import * as PerkuliahanDAO from '../dao/Perkuliahan'
import * as CommonDAO from '../dao/Common'
import * as DaftarHadirMahasiswaDAO from '../dao/DaftarHadirMahasiswa'
import * as BapDAO from '../dao/Bap'
import * as KeteranganDAO from '../dao/Keterangan'
import schedule from 'node-schedule'
import { DateTime } from 'luxon'

export const generateDaftarHadirDosen = async () => {
  try {
    // hanya dijalankan ketika pertama kali app di run
    await DaftarHadirDosenDAO.bikinDaftarHadirSeluruhDosenHariIni()
  } catch (error) {
    return Promise.reject(error)
  }
  schedule.scheduleJob('0 0 * * *', async () => {
    // akan dijalankan once a day jam 00:00
    try {
      await DaftarHadirDosenDAO.bikinDaftarHadirSeluruhDosenHariIni()
    } catch (error) {
      return Promise.reject(error)
    }
  })
}

export const melakukanAbsensi = async (nip, idStudi, idJadwal) => {
  try {
    // const jadwal = await JadwalDAO.findJadwalById(idJadwal)
    // presensi dapat dilakukan ketika
    // 30 menit sebelum perkuliaham dimulai
    // sampai batas akhir waktu perkuliahan
    const now = DateTime.now()
    const tglHariIni = now.toISODate()
    // const pembukaanPreseni = DateTime.fromISO(`${tglHariIni}T${jadwal[0].waktu_mulai}`).minus({ minutes: 30 })
    // const batasAkhirPresensi = DateTime.fromISO(`${tglHariIni}T${jadwal[0].waktu_selesai}`)

    // if (now >= pembukaanPreseni) {
    // presensi sudah dibuka
    // if (now <= batasAkhirPresensi) {
    // update kehadiran
    const result = await DaftarHadirDosenDAO.updateStatusKehadiranDosen(nip, idStudi, tglHariIni, true, idJadwal)
    // } else {
    // sudah melewati jam matkul
    // const error = new Error('Presensi sudah ditutup')
    // error.statusCode = 400
    // error.cause = 'Perkuliahan telah selesai'
    // throw error
    // }
    // } else {
    // presensi belum boleh dilakukan
    // const error = new Error('Presensi belum bisa dilakukan')
    // error.statusCode = 400
    // error.cause = 'Presensi dibuka 30 menit sebelum perkuliahan dimulai'
    // throw error
    // }

    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateKehadiranMahasiswa = async (idStudi, idJadwal, tanggal, isHadir) => {
  // author : hafizmfadli
  // return : rows daftar mahasiswa yang sudah update
  try {
    const jadwal = await JadwalDAO.findJadwalById(idJadwal)
    const jadwalRow = jadwal[0]
    const daftarHadirMhs = await DaftarHadirMahasiswaDAO.updateIsHadirMhs(idStudi, tanggal, jadwalRow.ja, jadwalRow.jb, isHadir)
    return daftarHadirMhs
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getDataBAP = async (idPerkuliahan, idJadwal, tanggal) => {
  // author : hafizmfadli
  // params : idPerkuliahan (int), idJadwal (int), tanggal (yyyy-mm-dd : string)
  // return : data yang dibutuhkan untuk mengisi bap
  try {
    const date = new Date(tanggal)
    const minggu = CommonDAO.calculateWeekOfMonth(date.getDate())
    const perkuliahan = await PerkuliahanDAO.findPerkuliahanByIdPerkuliahan(idPerkuliahan)
    const perkuliahanRows = perkuliahan[0][0]
    const daftarHadirMhs = await DaftarHadirMahasiswaDAO.getDaftarHadirKelasJadwal(perkuliahanRows.kode_kelas, idJadwal, tanggal)

    // hitung jumlah mhs yang tidak hadir dan hadir
    const nTidakHadir = daftarHadirMhs.mahasiswa.filter((mhs) => mhs.isHadir === false)
    const nHadir = daftarHadirMhs.mahasiswa.length - nTidakHadir.length
    const dataBap = {
      minggu,
      jumlah_mhs_hadir: nHadir,
      jumlah_mhs_tidak_hadir: nTidakHadir.length
    }
    return dataBap
  } catch (error) {
    return Promise.reject(error)
  }
}

export const uploadBAP = async (nip, materi, kegiatan, bukti, tanggal, idPerkuliahan, idJadwal) => {
  // author : hafizmfadli
  // params : nip (string), materi (string), kegiatan (string), bukti (string),
  //          tanggal (yyyy-mm-dd : string), idPerkuliahan (int), idJadwal (int)
  // return : bap yang disubmit
  try {
    const dataBap = await getDataBAP(idPerkuliahan, idJadwal, tanggal)
    const bap = await BapDAO.insertOne(materi, kegiatan, dataBap.minggu, bukti, dataBap.jumlah_mhs_hadir, dataBap.jumlah_mhs_tidak_hadir, tanggal, nip, idPerkuliahan)
    return bap
  } catch (error) {
    return Promise.reject(error)
  }
}

export const validasiKetidakhadiran = async (idKeterangan, isAccepted) => {
  try {
    const keterangan = await KeteranganDAO.updateIsAcceptedKeterangan(idKeterangan, isAccepted)
    return keterangan
  } catch (error) {
    return Promise.reject(error)
  }
}
