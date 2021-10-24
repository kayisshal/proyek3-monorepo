import Grup from '@proyek3/postgres-database/models/Grup'

export const insertOneGroup = async (nama) => {
  try {
    const grup = await Grup.create({
      nama: nama
    })

    if (grup instanceof Error) throw grup
    return grup
  } catch (error) {
    return Promise.reject(error)
  }
}
