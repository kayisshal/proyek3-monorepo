import Keterangan from '../models/Keterangan'
import db from '../db'

export const insertKeterangan = async (nim, status, url, isAccepted) => {
  try {
    const keterangan = await Keterangan.create({
      nim,
      status,
      url,
      isAccepted
    })
    return keterangan
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateIsAcceptedKeterangan = async (idKeterangan, isAccepted) => {
  try {
    const result = await db.query(`
    UPDATE "Keterangan" SET "isAccepted" = ${isAccepted} WHERE (id_keterangan = ${idKeterangan}) RETURNING *;
    `)
    const rows = result[0]
    return rows
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getByNim = async (nim) => {
  try {
    const result = await db.query(`
      SELECT DISTINCT mhs.nim, mhs.nama, ket.*, dhm.tanggal FROM "Mahasiswa" mhs
      INNER JOIN "Keterangan" ket ON ket.nim = mhs.nim
      INNER JOIN "daftar_hadir_mahasiswa" dhm ON dhm.id_keterangan = ket.id_keterangan
      WHERE mhs.nim='${nim}';
    `)
    if (result[0].length === 0) {
      // mhs belum pernah mengajukan izin
      return
    }
    // console.log("PERNAH IZIN SAYANG", result)
    // mhs pernah mengajukan izin
    const rows = result[0]
    const mhsKetMap = new Map()
    rows.forEach(mhsKet => {
      const nim = `${mhsKet.nim}`
      if (mhsKetMap.has(nim)) {
        // keterangan sudah ada pemiliknya
        // get, lalu tambahkan dengan ket yg baru
        const allKet = mhsKetMap.get(nim)
        const newKet = {
          id_keterangan: mhsKet.id_keterangan,
          status: mhsKet.status,
          tanggal: mhsKet.tanggal,
          isAccepted: mhsKet.isAccepted,
          url: mhsKet.url
        }
        allKet.push(newKet)
        mhsKetMap.set(nim, allKet)
      } else {
        // keterangan belum punya pemiliknya
        const firstKet = [{
          id_keterangan: mhsKet.id_keterangan,
          status: mhsKet.status,
          tanggal: mhsKet.tanggal,
          isAccepted: mhsKet.isAccepted,
          url: mhsKet.url
        }
        ]
        mhsKetMap.set(nim, firstKet)
      }
    })
    const finalResponse = {
      nim: rows[0].nim,
      nama: rows[0].nama,
      keterangans: mhsKetMap.get(nim)
    }
    return finalResponse
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getByKelas = async (kodeKelas) => {
  try {
    const result = await db.query(`
      SELECT mhs.nim, mhs.nama FROM "Mahasiswa" mhs
      INNER JOIN "Kelas" kls ON kls.kode_kelas = mhs.kode_kelas
      WHERE kls.kode_kelas=${kodeKelas};
    `)
    const rows = result[0]
    const keteranganMhsKelas = {
      kode_kelas: kodeKelas,
      mhs_izin: []
    }
    await Promise.all(rows.map(async (mhs) => {
      const ketMilikMhs = await getByNim(mhs.nim)
      if (ketMilikMhs) {
      // punya izin yg diajukan
        keteranganMhsKelas.mhs_izin.push(ketMilikMhs)
      }
    }))
    return keteranganMhsKelas
  } catch (error) {
    return Promise.reject(error)
  }
}
