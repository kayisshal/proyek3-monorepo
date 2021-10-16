import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import keteranganRoutes from './routes/Keterangan'
import jadwalRoutes from './routes/Jadwal'
import daftarHadirMahasiswaRoutes from './routes/DaftarHadirMahasiswa'
import daftarHadirDosenRoutes from './routes/DaftarHadirDosen'
import bapRoutes from './routes/Bap'
import * as MahasiswaService from './services/Mahasiswa'
import * as DosenService from './services/Dosen'

const app = express()

app.use(cors())
// Non aktifkan dulu keycloak agar tidak ada validasi token
// app.use(keycloak.middleware())
// app.use(keycloak.protect())
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/api/keterangan', keteranganRoutes)
app.use('/api/jadwal-perkuliahan', jadwalRoutes)
app.use('/api/daftar-hadir-mahasiswa', daftarHadirMahasiswaRoutes)
app.use('/api/daftar-hadir-dosen', daftarHadirDosenRoutes)
app.use('/api/bap', bapRoutes)

// error handling
app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500
  const message = error.message
  const cause = error.cause || 'Internal Server Error'
  res.status(status).json({
    message: message,
    error: status,
    cause: cause
  })
})

MahasiswaService.generateDaftarHadirMahasiswa()
  .then((value) => {
    console.log(value)
  })
  .catch(err => {
    console.error(err)
  })

DosenService.generateDaftarHadirDosen()
  .then((value) => {
    console.log(value)
  })
  .catch(err => {
    console.error(err)
  })

export default app
