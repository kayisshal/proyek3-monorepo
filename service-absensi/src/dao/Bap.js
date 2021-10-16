import db from '../db'

export const insertOne = async (materi, kegiatan, minggu, bukti, jumlahMhsHadir, jumlahMhsTdkHadir, tanggal, nip, idPerkuliahan) => {
  try {
    const result = await db.query(`
    INSERT INTO "Bap" (materi, kegiatan, minggu, bukti, jumlah_mhs_hadir, jumlah_mhs_tidak_hadir, tanggal, nip, id_perkuliahan) VALUES ('${materi}', '${kegiatan}', ${minggu}, '${bukti}', 
      ${jumlahMhsHadir}, ${jumlahMhsTdkHadir}, '${tanggal}', '${nip}', ${idPerkuliahan}) RETURNING *
    `)
    const rows = result[0]
    return rows
  } catch (error) {
    return Promise.reject(error)
  }
}

export const findOne = async (idJadwal, tanggal) => {
  try {
    const result = await db.query(
      `SELECT * FROM "Bap" bap
      INNER JOIN "Jadwal" j ON j.id_jadwal = bap.id_jadwal
      WHERE j.id_jadwal = ${idJadwal} AND bap.tanggal = '${tanggal}';`
    )
    const row = result[0]
    return row
  } catch (error) {
    return Promise.reject(error)
  }
}
