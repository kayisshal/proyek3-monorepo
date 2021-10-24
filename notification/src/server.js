import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

//Association
import setAssociations from './association'

import grupRouter from './routes/grup'
import userDeviceRouter from './routes/User_Device'
import emailNotifRouter from './routes/email_notification'
import userRouter from './routes/user'
import notificationRouter from './routes/notification'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/grup', grupRouter)
app.use('/user-device', userDeviceRouter)
app.use('/email-notif', emailNotifRouter)
app.use('/user', userRouter)
app.use('/notification', notificationRouter)

setAssociations()

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

export default app
