import * as DaftarHadirMahasiswaDAO from '../dao/DaftarHadirMahasiswa'
import * as KeteranganDAO from '../dao/Keterangan'

export const getDaftarHadirKelasJadwal = async (kodeKelas, idJadwal, tanggal) => {
  // author : hafizmfadli
  // return : daftar hadir seluruh mahasiswa pada suatu kelas tertentu
  try {
    const result = await DaftarHadirMahasiswaDAO.getDaftarHadirKelasJadwal(kodeKelas, idJadwal, tanggal)
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getDaftarHadirNimJadwalTanggal = async (nim, idJadwal, tanggal) => {
  // author : hafizmfadli
  // return : daftar hadri suatu mahasiswa dengan nim, idJadwal pada tanggal tertentu
  try {
    const result = await DaftarHadirMahasiswaDAO.getByNimJadwalTgl(nim, idJadwal, tanggal)
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getDaftarHadirNimTanggal = async (nim, tanggal) => {
  try {
    const result = await DaftarHadirMahasiswaDAO.getByNimTgl(nim, tanggal)
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getDashboardNim = async (nim) => {
  // author : hafizmfadli
  // return : daftar hadri suatu mahasiswa dengan nim, idJadwal pada tanggal tertentu
  try {
    const jumlahJamSakit = await DaftarHadirMahasiswaDAO.getKeteranganSakitByNim(nim)
    const jumlahJamIzin = await DaftarHadirMahasiswaDAO.getKeteranganIzinByNim(nim)
    const jumlahJamAlfa = await DaftarHadirMahasiswaDAO.getKeteranganAlfaByNim(nim)
    const kehadiran = await DaftarHadirMahasiswaDAO.getPersentaseKehadiranByNim(nim)
    const persentaseKehadiran = kehadiran.persentaseKehadiran
    const jumlahJamHadir = kehadiran.jumlahJamHadir
    const keteranganSP = await DaftarHadirMahasiswaDAO.getTotalJamSPbyNim(nim)
    const result = {
      jumlahJamSakit: jumlahJamSakit,
      jumlahJamIzin: jumlahJamIzin,
      jumlahJamAlfa: jumlahJamAlfa,
      persentaseKehadiran: persentaseKehadiran,
      jumlahJamHadir: jumlahJamHadir,
      keteranganSP: keteranganSP
    }
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getMahasiswaKelasIzin = async (kodeKelas) => {
  try {
    const result = await KeteranganDAO.getByKelas(kodeKelas)
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}
