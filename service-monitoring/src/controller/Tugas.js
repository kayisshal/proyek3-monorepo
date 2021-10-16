import * as TugasDAO from '../dao/Tugas'
import * as StudiDAO from '../dao/Studi'
import * as PerkuliahaDAO from '../dao/Perkuliahan'
import * as MahasiswaDAO from '../dao/Mahasiswa'
import * as MataKuliahDAO from '../dao/Mata Kuliah'
// import modelMhs from '@proyek3/postgres-database/models/Mahasiswa'
import modelMhs from '../models/Mahasiswa'
import { validationResult } from 'express-validator/check'
import axios from 'axios'

// export const postNewTugas = async (req, res, next) => {
//   try {
//     const {
//       nama_tugas,
//       status_progress,
//       status_durasi,
//       status_skala,
//       status_catatan,
//       status_lampiran,
//       id_perkuliahan,
//       nip
//     } = req.body
//     const now = new Date()
//     const { createdAt, updatedAt} = now
//     const error = validationResult(req)
//       if (!error.isEmpty()) {
//         error.status = 400
//         throw error
//       }
//       const tugas = await TugasDAO.insertOneTugas(
//         nama_tugas,
//         status_progress,
//         status_durasi,
//         status_skala,
//         status_catatan,
//         status_lampiran,
//         createdAt,
//         updatedAt,
//         id_perkuliahan,
//         nip)
//       res.status(200).json({
//         message: 'insert tugas sukses',
//         data: {
//           tugas
//         }
//       })
//   }
//   catch (error) {
//     next(error)
//   }
// }
export const postNewTugas = async (req, res, next) => {
  try {
    const {
      nama_tugas,
      status_progress,
      status_durasi,
      status_skala,
      status_catatan,
      status_lampiran,
      id_perkuliahan,
      nip
    } = req.body
    const now = new Date()
    const { createdAt, updatedAt} = now
    const error = validationResult(req)
      if (!error.isEmpty()) {
        error.status = 400
        throw error
      }
      const tugas = await TugasDAO.insertOneTugas(
        nama_tugas,
        status_progress,
        status_durasi,
        status_skala,
        status_catatan,
        status_lampiran,
        createdAt,
        updatedAt,
        id_perkuliahan,
        nip
      )

      //untuk menampung mahasiswa yang ingin dikirim notif tugas baru
      const nimBulk = []

      //mengambil array mhs berdasarkan kode kelas
      const perkuliahan = await PerkuliahaDAO.findPerkuliahanById(id_perkuliahan)
      const kodeKelas = perkuliahan.kode_kelas
      const arrMhs = await modelMhs.findAll({
        where: {
          kode_kelas : kodeKelas
        }
      })

      //mengambil nim setiap mhs
      for (const el of arrMhs) {
        nimBulk.push(el.nim)
      }

      // panggil api email notif
      console.log(nimBulk)
      const matkul = await MataKuliahDAO.findMatkulById(perkuliahan.id_mata_kuliah)
      const namaMatkul = matkul.nama_mata_kuliah
      const kodeMatkul = matkul.id
      for (const el of nimBulk) {
        const resultSendEmail = await axios.post(
          process.env.URL_NOTIF + '/email-notif/personal',
          {
            idUser: el,
            subject: `TUGAS BARU MATA KULIAH ${namaMatkul} (${kodeMatkul})`,
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
                                      <table class="col-652" order="0" cellpadding="0" cellspacing="0" style="padding: 10px 80px;background-color: #FFFFFF;">
                                        <tr>
                                          <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size:20px; color:#242424; line-height:24px; font-weight: bold;"> Tugas Baru Mata Kuliah ${namaMatkul} berjudul ${nama_tugas} </td>
                                        </tr>
                                        <tr>
                                          <td height="50"></td>
                                        </tr>
                                        <tr>
                                          <td id="paragraph" style="font-family: Arial, Helvetica, sans-serif; font-size:12px; color:#242424; line-height:24px; font-weight: 300; padding: 10px 40px;"> Dosen Anda telah menambahkan tugas baru. <br>
                                            <br> Silahkan cek tugasnya pada halaman website monitoring tugas dan isi monitoring tugasnya. <br>
                                            <br>
                                            <!-- <div align="center">
                                              <a class="button" href="http://localhost:14415/monitoring/dosen/monitoring-tugas/daftar-tugas/${kodeMatkul}/${id_perkuliahan}" target="_blank" style="background-color: #59DCDC;border: none;color: white;padding: 10px 10px;text-align: center;text-decoration: none;display: inline-block;font-family: Arial, Helvetica, sans-serif;font-size: 12px;margin: 2px;cursor: pointer;border-radius: 8px;width: 100px;"> TUGAS </a>
                                            </div> -->
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
      res.status(200).json({
        message: 'insert tugas sukses',
        data: {
          tugas
        }
      })
  }
  catch (error) {
    next(error)
  }
}

export const getAllTugasMahasiswa = async (req, res) => {
  const nim = req.params.nim
  try {
    const tugas = await TugasDAO.getAllTugasMahasiswa(nim)
    res.json({
      message: `Get All Tugas ${nim}`,
      data: {
        tugas
      }
    })
  } catch (error) {
    res.status(error.status).json({ error })
  }
}

export const getAllTugasMahasiswaByid_tugas = async (req, res) => {
  const id_tugas = req.params.id
  try {
    const mahasiswa = await TugasDAO.getAllTugasMahasiswaByid_tugas(id_tugas)
    res.json({
      message: 'Get All Tugas Mahasiswa by id tugas berhasil',
      data: {
        mahasiswa
      }
    })
  }
  catch (error) {
    res.status(error.status).json ({ error })
  }
}

export const getTugasById = async (req, res, next) => {
    try {
        const id_tugas = req.params.id
        const tugas = await TugasDAO.findTugasById(id_tugas)
        res.status(200).json({
            message: 'get tugas by id sukses',
            data: {
                tugas
            }
        })
    }
    catch (error) {
        next(error)
    }
}

export const getTugasByMatkul = async (req, res, next) => {
  try {
        const id_matkul = req.params.id_matkul
        const id_perkuliahan = req.params.id_perkuliahan
        const perkuliahan = await PerkuliahaDAO.findPerkuliahanByMatkul(id_matkul)
        var i,j
        var listTugas = []
        var listidTugas = []
        for (i = 0; i < perkuliahan.length; i++){
          var tugas = await TugasDAO.findTugasByPerkuliahan(perkuliahan[i].id)
          for (j = 0; j < tugas.length; j++){
            if (tugas[j].id_perkuliahan == id_perkuliahan){
              listTugas.push(tugas[j].nama_tugas)
              listidTugas.push(tugas[j].id)
            }
          }
        }
        res.status(200).json({
            message: 'get tugas by matkul sukses',
            data: {
              perkuliahan,
              listTugas,
              listidTugas
            }
        })
    }
    catch (error) {
        res.status(error.status).json({ error })
    }
}

export const getAllMahasiswaAssignedTugas = async (req, res, next) => {
  try {
        const id_tugas = req.params.id
        const tugas = await TugasDAO.findTugasById(id_tugas)
        const perkuliahan = await PerkuliahaDAO.findPerkuliahanById(tugas.id_perkuliahan)
        var studi = await StudiDAO.findStudiByIdPerkuliahan(perkuliahan.id)
        var i
        var listNamaMahasiswa = []
        var listNIMMahasiswa = []
        var listIdStudi = []
        for (i = 0; i < studi.length; i++){
          var mahasiswa = await MahasiswaDAO.findOneMahasiswaByNIM(studi[i].id_mahasiswa)
          listNamaMahasiswa.push(mahasiswa.nama)
          listNIMMahasiswa.push(mahasiswa.nim)
          listIdStudi.push(studi[i].id)
        }
        res.status(200).json({
            message: 'get mahasiswa by matkul sukses',
            data: {
              // tugas,
              // perkuliahan,
              // studi,
              // mahasiswa,
              listIdStudi,
              listNIMMahasiswa,
              listNamaMahasiswa
            }
        })
    }
    catch (error) {
        res.status(error.status).json({ error })
    }
}

export const getKriteriaOfTugas = async (req, res, next) => {
  try {
      const id_tugas = req.params.id
      const tugas = await TugasDAO.findTugasById(id_tugas)
      var progress, durasi, skala, catatan, lampiran
      progress = tugas.status_progress
      durasi = tugas.status_durasi
      skala = tugas.status_skala
      catatan = tugas.status_catatan
      lampiran = tugas.status_lampiran

      res.status(200).json({
          message: 'get kriteria by tugas sukses',
          data: {
            progress,
            durasi,
            skala,
            catatan,
            lampiran
          }
      })
  }
  catch (error) {
      next(error)
  }
}