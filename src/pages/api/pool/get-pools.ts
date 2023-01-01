import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/pages/api/data/prisma-client'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { take, skip } = req.query

    let takeString = take ? take.toString() : '6' 
    let skipString = skip ? skip.toString() : '0'
  
    const pools = await prisma.pool.findMany({
      where: {
        status: 'active'
      },

      orderBy: {
        createdAt: 'asc'
      },

      include: {
        contributions: true
      },

      take: takeString ? parseInt(takeString) : undefined,
      skip: skipString ? parseInt(skipString) : undefined
    })

    res.status(200).send(JSON.stringify(pools))

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}