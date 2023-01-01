import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/pages/api/data/prisma-client'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query

    if (!id) {
      res.status(400).json({ message: 'Missing pool id' })
      return
    }

    const pool = await prisma.pool.findUnique({
      where: {
        id: parseInt(id as string)
      },
      include: {
        owner: {
          select: {
            wallet: true,
          }
        },
        contributions: true,
      }
    })

    const appConfig = await prisma.appConfig.findUnique({
      where: {
        id: 1
      }
    })

    if (!pool) {
      res.status(404).json({ message: 'Pool not found' })
      return
    }

    res.status(200)
    .send(JSON.stringify({
      pool,
      appConfig
    }))
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}