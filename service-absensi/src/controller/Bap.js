import * as DosenService from '../services/Dosen'
import upload from '../middleware/upload'
import * as BapDAO from '../dao/Bap'

export const getDataBAP = async (req, res, next) => {
  const { idPerkuliahan, idJadwal, tanggal } = req.query
  try {
    const result = await DosenService.getDataBAP(idPerkuliahan, idJadwal, tanggal)
    res.json({
      message: `BAP untuk idPeruliahan ${idPerkuliahan} pada idJadwal ${idJadwal} pada tanggal ${tanggal}`,
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const uploadBAP = async (req, res, next) => {
  upload.single('bap-bukti')(req, res, async (err) => {
    if (err) {
      // something error
      return res.status(500).json({
        message: err,
        data: {}
      })
    }

    if (req.file === undefined) {
      // file undefined
      return res.status(400).json({
        message: 'Bad request : No File Selected',
        data: {}
      })
    }

    const { nip, materi, kegiatan, tanggal, idPerkuliahan, idJadwal } = req.body

    try {
      const url = req.file.path
      const results = await DosenService.uploadBAP(nip, materi, kegiatan, url, tanggal, idPerkuliahan, idJadwal)
      const rows = results[0]
      res.json({
        message: `Dosen dengan nip ${nip} mengupload bap pada tgl ${tanggal} untuk idPerkuliahan ${idPerkuliahan} dan idJadwal ${idJadwal}`,
        data: rows
      })
    } catch (error) {
      res.status(500).json({ error })
    }
  })
}

export const findBap = async (req, res, next) => {
  const { idJadwal, tanggal } = req.query
  try {
    const bap = await BapDAO.findOne(idJadwal, tanggal)
    const result = bap[0]
    res.json({
      message: `BAP idJadwal ${idJadwal} pada tanggal ${tanggal}`,
      data: {
        bap: result
      }
    })
  } catch (error) {
    next(error)
  }
}
