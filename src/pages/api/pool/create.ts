import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/pages/api/data/prisma-client'

import nc from 'next-connect'

export interface File {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  size: number
  bucket: string
  key: string
  acl: string
  contentType: string
  location: string
}

export const config = {
  api: {
    bodyParser: false
  }
}

import upload from '@/services/upload'

type NextApiRequestWithFile = NextApiRequest & {
  file: File
}

interface NextApiRequestBody {
  title: string
  address: string
  startDate: string
  endDate: string
  videoUri: string | null
  token: string
  goal: string
  wallet: string
  chainId: string
}

const handler = nc<NextApiRequestWithFile, NextApiResponse>()
.use(upload.single('thumb'))
.post(async (req, res) => {
  try {
    const requiredFields = ['title', 'address', 'startDate', 'endDate', 'goal', 'wallet', 'chainId']

    for (const field of requiredFields) {
      if (!req.body[field]) {
        res.status(400).send({ error: `Missing param: ${field}` })
        return
      }
    }

    const { title, address, startDate, endDate, videoUri, goal, wallet, chainId } = req.body as NextApiRequestBody

    const user = await prisma.user.findUnique({
      where: {  
        wallet
      }
    })

    if (!user) {
      res.status(400).send({ error: 'User not found' })
      return
    }

    const pool = await prisma.pool.create({
      data: {
        title,
        address,
        startDate,
        endDate,
        videoUri,
        goal: parseFloat(goal),
        owner: {
          connect: {
            wallet
          }
        },
        thumbUri: req.file.location,
        thumbKey: req.file.key,
        chainId
      },
    })

    res.status(200).send(pool)
  } catch (error: any) {
    console.log(error)
    res.status(500).send(error.message)
  }
})

export default handler