import admin from 'firebase-admin'
import serviceAccount from './proyek3-95653-firebase-adminsdk-bo7y7-5b3e0c7833.json'

const adminInstance = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export default adminInstance
