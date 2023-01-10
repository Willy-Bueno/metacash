import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/pages/api/data/prisma-client'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { address } = req.body

    if (!address) res.send({ message: 'Missing address' })

    const user = await prisma.user.findUnique({
      where: {
        wallet: address,
      }
    })

    if (!user) res.send({ message: 'User not found' })

    const pools = await prisma.pool.findMany({
      where: {
        ownerId: user?.id,
      }
    })

    res.send({
      user,
      pools
    })

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}