import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function (req: NextApiRequest, res: NextApiResponse) {

  const requiredFields = ['wallet']

  for (const field of requiredFields) {
    if (!req.body[field]) {
      res.status(400).send({ error: `Missing param: ${field}` })
      return
    }
  }

  const { wallet } = req.body  

  const prisma = new PrismaClient()

  let user;

  user = await prisma.user.findUnique({
    where: {
      wallet
    }
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        wallet
      }
    })
  }

  res.status(200).json(user)
}