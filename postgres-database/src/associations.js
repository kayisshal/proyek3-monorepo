import mataKuliah from './models/Mata_Kuliah'
import programStudi from './models/Program_Studi'
import mahasiswa from './models/Mahasiswa'
import kelas from './models/Kelas'
import perkuliahan from './models/Perkuliahan'
import dosen from './models/Dosen'
import jabatan from './models/Jabatan'
import jurusan from './models/Jurusan'
import studi from './models/Studi'
import user from './models/user'
import userDevice from './models/User_Device'
import grup from './models/Grup'

const setAssociations = async () => {
  programStudi.hasMany(mataKuliah, {
    foreignKey: 'kode_program_studi'
  })
  mahasiswa.belongsToMany(perkuliahan, {
    through: 'Studi'
  })
  kelas.hasMany(mahasiswa, {
    foreignKey: 'kode_kelas'
  })
  kelas.hasMany(perkuliahan, {
    foreignKey: 'kode_kelas'
  })
  mataKuliah.hasMany(perkuliahan, {
    foreignKey: 'id'
  })
  perkuliahan.hasMany(studi, {
    foreignKey: 'id'
  })
  mahasiswa.hasMany(studi, {
    foreignKey: 'id'
  })
  dosen.belongsToMany(perkuliahan, {
    through: 'Pengajar'
  })
  perkuliahan.belongsToMany(dosen, {
    through: 'Pengajar'
  })
  dosen.hasMany(kelas, {
    foreignKey: 'nip'
  })
  dosen.hasMany(programStudi, {
    foreignKey: 'nip'
  })
  dosen.hasMany(jurusan, {
    foreignKey: 'nip'
  })
  dosen.belongsToMany(jabatan, {
    through: 'menjabat'
  })
  programStudi.hasMany(mataKuliah, {
    foreignKey: 'kode_program_studi'
  })
  programStudi.hasMany(kelas, {
    foreignKey: 'kode_program_studi'
  })
  jurusan.hasMany(programStudi, {
    foreignKey: 'kode_jurusan'
  })
  user.hasMany(userDevice, {
    foreignKey: 'id_user'
  })
  user.belongsToMany(grup, {
    through: 'User_Group',
    foreignKey: 'id_user'
  })
  grup.belongsToMany(user, {
    through: 'User_Group',
    foreignKey: 'nama_grup'
  })
}
export default setAssociations
