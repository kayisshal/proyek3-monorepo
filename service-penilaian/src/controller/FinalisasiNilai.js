import * as StudiDAO from '../dao/Studi'
import * as PerkuliahanDAO from '../dao/Perkuliahan'
import * as MatkulDAO from '../dao/Mata Kuliah'

import expressValidator from 'express-validator/check'
const { validationResult } = expressValidator
import axios from 'axios'

export const FinalisasiNilai = async (req, res, next) => {
    try{
        const idPerkuliahan = req.params.id_perkuliahan
        const perkuliahan = await PerkuliahanDAO.findPerkuliahanById(idPerkuliahan)
        const matkul = await MatkulDAO.findMatkulById(perkuliahan.id_mata_kuliah)

        console.log(matkul)

        const mhs = await StudiDAO.findStudiByIdPerkuliahan(idPerkuliahan)
        var arrNIM = []
        for(var i=0; i<mhs.length; i++){
            arrNIM.push(mhs[i].id_mahasiswa)
        }

        // Ngirim notifikasi
        for (const el of arrNIM) {
            const resultSendEmail = await axios.post(
              process.env.URL_NOTIF + '/email-notif/personal',
              {
                idUser: el,
                subject: `Finalisasi ${matkul.nama_mata_kuliah} (${matkul.id})`,
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
                                              <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size:20px; color:#242424; line-height:24px; font-weight: bold;"> Finalisasi Nilai Matkul ${matkul.nama_mata_kuliah} telah dilakukan.</td>
                                            </tr>
                                            <tr>
                                              <td height="50"></td>
                                            </tr>
                                            <tr>
                                              <td id="paragraph" style="font-family: Arial, Helvetica, sans-serif; font-size:12px; color:#242424; line-height:24px; font-weight: 300; padding: 10px 40px;">
                                              Silakan cek dengan menekan tombol dibawah ini.
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

       
        if(mhs === undefined || arrNIM === null){
          console.log("Finalisasi gagal")
          throw error
        }
        res.status(200).json({
          message: 'Finalisasi success',
          data: {
            dataMahasiswa: arrNIM
          }
        })
      } catch(error){
        next(error)
      }
}