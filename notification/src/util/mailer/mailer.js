import nodemailer from 'nodemailer'

const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NOTIF_EMAIL_EMAIL,
    pass: process.env.NOTIF_EMAIL_PW
  }
}

const transporter = nodemailer.createTransport(smtpConfig)

transporter.verify((err, success) => {
  if (err) return new Error(err)
  console.log('nodemailer config is correct')
})

export const sendEmail = async (subject, bodyEmail, recipient) => {
  const address = {
    name: 'Politeknik Negeri Bandung',
    address: process.env.NOTIF_EMAIL_EMAIL
  }
  return await transporter.sendMail({
    from: address,
    to: recipient,
    subject: subject,
    html: bodyEmail
  })
}
