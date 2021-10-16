import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: process.cwd() + '\\public\\uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// Check file type
function checkFileType (file, cb) {
  // allowed ext
  const filetypes = /jpeg|jpg|png/
  // check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(new Error('Error: Images Only !'))
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 100000
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})

export default upload
