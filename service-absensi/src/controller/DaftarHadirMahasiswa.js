import * as MahasiswaService from '../services/Mahasiswa'
import * as DaftarHadirMahasiswaService from '../services/DaftarHadirMahasiswa'
import * as DosenService from '../services/Dosen'

export const presensiMhsHandler = async (req, res, next) => {
  // Author : hafizmfadli
  // response : daftar hadir suatu mhs yang melakukan presensi
  const { idStudi, idJadwal } = req.query
  try {
    const result = await MahasiswaService.melakukanAbsensi(idStudi, idJadwal)
    res.json({
      message: `Mengisi presensi pada idStudi ${idStudi} dan idJadwal ${idJadwal}`,
      data: {
        presensi: result
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getDaftarHadirKelasJadwal = async (req, res, next) => {
  // Author : hafizmfadli
  // response : daftar hadir seluruh mahasiswa pada suatu kelas pd tgl dan jadwal tertentu
  const { kodeKelas, idJadwal, tanggal } = req.query
  try {
    const result = await DaftarHadirMahasiswaService.getDaftarHadirKelasJadwal(kodeKelas, idJadwal, tanggal)
    res.json({
      message: `daftar hadir kelas ${kodeKelas} pada jadwal ${idJadwal} pada tanggal ${tanggal}`,
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const getDaftarHadirNimJadwalTgl = async (req, res, next) => {
  const { nim, idJadwal, tanggal } = req.query

  try {
    const result = await DaftarHadirMahasiswaService.getDaftarHadirNimJadwalTanggal(nim, idJadwal, tanggal)
    res.json({
      message: `daftar hadir ${nim} pada jadwal ${idJadwal} pada tanggal ${tanggal}`,
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const getDaftarHadirNimTgl = async (req, res, next) => {
  const { nim, tanggal } = req.query

  try {
    const result = await DaftarHadirMahasiswaService.getDaftarHadirNimTanggal(nim, tanggal)
    res.json({
      message: `daftar hadir ${nim} pada pada tanggal ${tanggal}`,
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const updateStatusKehadiran = async (req, res, next) => {
  const { idStudi, idJadwal, tanggal, isHadir } = req.query
  try {
    const result = await DosenService.updateKehadiranMahasiswa(idStudi, idJadwal, tanggal, isHadir)
    res.json({
      message: `update kehadiran mhs dengan idStudi ${idStudi} pada  jadwal ${idJadwal} dan tanggal ${tanggal} menjadi ${isHadir}`,
      data: result
    })
  } catch (error) {

  }
}

export const dashboardMahasiswaHandler = async (req, res, next) => {
  const { nim } = req.query

  try {
    const result = await DaftarHadirMahasiswaService.getDashboardNim(nim)
    res.json({
      message: `dashboard ${nim}`,
      data: result
    })
  } catch (error) {
    next(error)
  }
}
