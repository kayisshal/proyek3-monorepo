import * as DosenService from '../services/Dosen'
import * as DaftarHadirDosenService from '../services/DaftarHadirDosen'

export const presensiDosenHandler = async (req, res, next) => {
  const { nip, idStudi, idJadwal } = req.query
  try {
    const result = await DosenService.melakukanAbsensi(nip, idStudi, idJadwal)
    res.json({
      message: `Mengisi presensi dengan NIP ${nip} dan idStudi ${idStudi} dan idJadwal ${idJadwal}`,
      data: {
        presensi: result
      }
    })
  } catch (error) {
    next(error)
  }
}

// export const bikinDaftarHadirDosenHandler = async (req, res, next) => {
//   try {
//     const result = await DaftarHadirDosenDAO.bikinDaftarHadirSeluruhDosenHariIni()
//     res.json({
//       message: 'Generate seluruh daftar hadir dosen hari ini',
//       data: {
//         presensi: result
//       }
//     })
//   } catch (error) {
//     next(error)
//   }
// }

export const getDaftarHadirNipJadwalTgl = async (req, res, next) => {
  const { nip, idJadwal, tanggal } = req.query

  try {
    const result = await DaftarHadirDosenService.getDaftarHadirNipJadwalTanggal(nip, idJadwal, tanggal)
    res.json({
      message: `daftar hadir ${nip} pada jadwal ${idJadwal} pada tanggal ${tanggal}`,
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const persentaseMengajarDosenHandler = async (req, res, next) => {
  const { nip } = req.query

  try {
    const result = await DaftarHadirDosenService.getPersentaseMengajarByNip(nip)
    res.json({
      message: `persentase mengajar dosen dengan nip = ${nip}`,
      data: result
    })
  } catch (error) {
    next(error)
  }
}
