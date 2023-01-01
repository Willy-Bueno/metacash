import { S3Client } from '@aws-sdk/client-s3'
import multer from 'multer'
import multerS3 from 'multer-s3'
import crypto from 'node:crypto'



const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  }
})

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET as string,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, raw) => {
        if (err) {
          cb(err)
        }
        const fileName = `${raw.toString('hex')}${Date.now()}-${file.originalname}`

        cb(null, fileName)
      })
    }
  })
})

export default upload