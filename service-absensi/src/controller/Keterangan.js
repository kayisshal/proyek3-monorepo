import path from 'path'
import upload from '../middleware/upload'
import * as MahasiswaServices from '../services/Mahasiswa'
import * as DosenServices from '../services/Dosen'
import * as DaftarHadirMahasiwaServices from '../services/DaftarHadirMahasiswa'
import modelMhs from '@proyek3/postgres-database/models/Mahasiswa'
import modelKelas from '@proyek3/postgres-database/models/Kelas'
import modelJadwal from '../models/Jadwal'
import modelTU from '@proyek3/postgres-database/models/Tata_Usaha'
import axios from 'axios'

export const getSuratIzin = (req, res) => {
  const { filename } = req.params
  const dirname = path.resolve()
  const fullfilepath = path.join(dirname, 'public/uploads/', filename)
  return res.sendFile(fullfilepath)
}
// Catatan : gimana cara nya untuk rollback upload file :(
export const uploadSuratIzin = (req, res) => {
  upload.single('surat-izin')(req, res, async (err) => {
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

    const { idJadwals, status, nim, tglIzin } = req.body

    try {
      const url = req.file.path

      // pastikan idStudies adalah array
      let idJadwalArr = idJadwals
      if (!Array.isArray(idJadwals)) {
        idJadwalArr = [idJadwals]
      }
      console.log(idJadwalArr)
      const results = await MahasiswaServices.ajukanIzin(
        idJadwalArr,
        status,
        url,
        nim,
        tglIzin
      )
      const rows = results[0]

      const nipBulk = []
      // get mhs buat dapetin id kelas
      const objMhs = await modelMhs.findByPk(nim)

      // get nip dosen wali dari model kelas get by id kelas
      const nipWalDos = await modelKelas.findByPk(objMhs.kode_kelas)
      nipBulk.push(nipWalDos.nip)

      // get nip dosen pengampu dari model jadwal by id jadwal
      for (const el of idJadwalArr) {
        const jadwal = await modelJadwal.findByPk(el)
        nipBulk.push(jadwal.nip)
      }

      // get all TU (nanti bakal dapet nip)
      const arrTu = await modelTU.findAll()
      for (const el of arrTu) {
        nipBulk.push(el.nip)
      }
      // panggil api email notif
      console.log(nipBulk)
      for (const el of nipBulk) {
        const resultSendEmail = await axios.post(
          process.env.URL_NOTIF + '/email-notif/personal',
          {
            idUser: el,
            subject: `UPLOAD SURAT IZIN MAHASISWA NIM ${nim}`,
            bodyEmail: `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>Politeknik Negeri Bandung</title>
              </head>
              <body style="background-color: #eeeeee; margin: 0;">
                <table width="100%" height="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                  <!-- <tbody style="background-color: #000000;"> -->
                  <!-- START HEADER -->
                  <table id="header" width="100%" height="60" align="center" cellpadding="0" cellspacing="0" style="border: 1px #C9C9C9 solid;background-color: #FFFFFF;">
                    <tr>
                      <td align="center" width="50" style="padding: 5px 10px 0px;">
                        <img alt="Logo Politeknik Negeri Bandung" src="https://i.ibb.co/Nyb735s/logo-polban.png" width="20">
                      </td>
                      <td style="font-family: Arial, sans-serif; font-size:11px; color:#242424; line-height:24px; font-weight: 600;"> Politeknik Negeri Bandung </td>
                    </tr>
                  </table>
                  <!-- END HEADER -->
                  <table id="content" width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width: 800px;background-color: #FFFFFF;">
                    <tr>
                      <td height="50"></td>
                    </tr>
                    <tr>
                      <td align="center" valign="top">
                        <table bgcolor="#FFFFFF" class="col-652" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td align="center" valign="top" style="background-size:cover; background-position:top;">
                                <table class="col-652" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                  <tbody>
                                    <tr id="content">
                                      <table class="col-652" order="0" cellpadding="0" cellspacing="0" style="padding: 10px 80px">
                                        <tr>
                                          <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size:20px; color:#242424; line-height:24px; font-weight: bold;"> Pemberitahuan Mahasiswa Telah Mengunggah Surat Izin Perkuliahan </td>
                                        </tr>
                                        <tr>
                                          <td height="50"></td>
                                        </tr>
                                        <tr>
                                          <td id="paragraph" style="font-family: Arial, Helvetica, sans-serif; font-size:12px; color:#242424; line-height:24px; font-weight: 300; padding: 10px 40px;">
                                          Pemberitahuan mahasiswa dengan NIM ${nim} telah mengunggah surat izin untuk tidak mengikuti perkuliahan. Silahkan periksa surat izin tersebut di laman Sistem Absensi.
                                            <br>
                                            <br>
                                            <div align="center">
                                              <a class="button" href="https://www.google.com/" target="_blank" style="background-color: #59DCDC;
                                              border: none;
                                              color: white;
                                              padding: 10px 10px;
                                              text-align: center;
                                              text-decoration: none;
                                              display: inline-block;
                                              font-family: Arial, Helvetica, sans-serif;
                                              font-size: 12px;
                                              margin: 2px;
                                              cursor: pointer;
                                              border-radius: 8px;
                                              width: 100px;"> Periksa Surat</a>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table id="footer" width="100%" height="100" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width: 800px;background-color: #FFFFFF;">
                    <tr align="center">
                      <td>
                        <p>
                          <hr>
                        <div style="font-family: Arial, Helvetica, sans-serif; font-size:12px; color:#272343; line-height:24px; font-weight: 600;"> Copyright Politeknik Negeri Bandung. All right reserved. </div>
                        <div style="font-family: Arial, Helvetica, sans-serif; font-size:12px; color:#242424; line-height:24px; font-weight: 400;"> Jl. Gegerkalong Hilir, Ciwaruga, Kec. Parongpong, <br> Kabupaten Bandung Barat, Jawa Barat 40559 </div>
                        </p>
                      </td>
                    </tr>
                  </table>
                  <!-- </tbody> -->
                </table>
              </body>
            </html>`
          }
        )
        console.log(resultSendEmail)
      }
      // done

      res.json({
        message: `mahasiswa nim ${nim} mengajukan izin dengan status ${status} untuk tanggal ${tglIzin}`,
        data: rows
      })
    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({ error })
      }
      res.json({ error })
    }
  })
}

export const validasiKetidakhadiran = async (req, res, next) => {
  const { idKeterangan, isAccepted } = req.query
  try {
    const result = await DosenServices.validasiKetidakhadiran(
      idKeterangan,
      isAccepted
    )
    res.json({
      message: `validasi ketidakhadiran dengan id keterangan ${idKeterangan} dan kode validasi berupa ${isAccepted}`,
      data: result
    })
  } catch (error) {}
}

export const mhsKelasIzin = async (req, res, next) => {
  const { KodeKelas } = req.query
  try {
    const result = await DaftarHadirMahasiwaServices.getMahasiswaKelasIzin(
      KodeKelas
    )
    res.json({
      message: `list mahasiswa izin pada kelas ${KodeKelas}`,
      data: result
    })
  } catch (error) {
    next(error)
  }
}
