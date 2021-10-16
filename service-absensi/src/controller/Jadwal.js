import * as JadwalDAO from '../dao/Jadwal'

export const getJadwalMhsHrTertentuHandler = async (req, res) => {
  const nim = req.query.nim
  const hari = req.query.hari
  try {
    const result = await JadwalDAO.getJadwalMhsHrTertentu(nim, hari)
    res.json({
      message: `Jadwal kuliah nim ${nim} pada hari ${hari}`,
      data: {
        jadwal: result
      }
    })
  } catch (error) {
    res.status(error.status).json({ error })
  }
}

export const getJadwalDosenHrTertentuHandler = async (req, res) => {
  const nip = req.query.nip
  const hari = req.query.hari
  try {
    const result = await JadwalDAO.getJadwalDosenHrTertentu(nip, hari)
    const d = new Date()
    const tanggalHariIni = `${d.getFullYear()}:${d.getMonth() + 1}:${d.getDate()}`
    res.json({
      message: `Jadwal dosen nip ${nip} pada hari ${hari}`,
      data: {
        jadwal: result,
        tanggalHariIni: tanggalHariIni
      }
    })
  } catch (error) {
    res.status(error.status).json({ error })
  }
}

export const getAllJadwal = async (req, res) => {
  try {
    const result = await JadwalDAO.getAllJadwal()
    res.json({
      message: 'Semua jadwal kuliah',
      data: {
        jadwal: result
      }
    })
  } catch (error) {
    res.status(error.status).json({ error })
  }
}

export const postNewJadwal = async (req, res, next) => {
  try {
    const {
      ja,
      jb,
      waktuMulai,
      waktuSelesai,
      hari,
      jenis,
      nip,
      idPerkuliahan
    } = req.body

    // set default batas terakhir absen
    const arrayWaktuMulai = waktuMulai.split(':')
    const detik = parseInt(arrayWaktuMulai[2]) + 0
    let menit = parseInt(arrayWaktuMulai[1]) + 30
    let jam = parseInt(arrayWaktuMulai[0]) + 0
    if (menit >= 60) {
      jam += 1
      menit -= 60
    }

    // detik
    let stringDetik
    if (detik > 9) {
      stringDetik = detik.toString()
    } else {
      stringDetik = '0' + detik.toString()
    }

    // menit
    let stringMenit
    if (menit > 9) {
      stringMenit = menit.toString()
    } else {
      stringMenit = '0' + menit.toString()
    }

    // jam
    let stringJam
    if (jam > 9) {
      stringJam = jam.toString()
    } else {
      stringJam = '0' + jam.toString()
    }

    const batasTerakhirAbsen = stringJam + ':' + stringMenit + ':' + stringDetik

    const jadwal = await JadwalDAO.insertJadwal(
      parseInt(ja),
      parseInt(jb),
      waktuMulai,
      waktuSelesai,
      batasTerakhirAbsen,
      parseInt(hari),
      jenis,
      nip,
      parseInt(idPerkuliahan)
    )

    res.status(200).json({
      message: 'insert jadwal sukses',
      data: {
        jadwal
      }
    })
  } catch (error) {
    next(error)
  }
}
