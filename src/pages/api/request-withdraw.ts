import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/pages/api/data/prisma-client'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const requiredFields = ['user_id', 'pool_id']

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `Missing field: ${field}` })
      }
    }

    const { user_id, pool_id } = req.body

    const user = await prisma.user.findUnique({
      where: {
        id: user_id
      }
    })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    
    const pool = await prisma.pool.update({
      where: {
        id: pool_id
      },
      data: {
        status: 'finished'
      }
    })

    if (!pool) {
      return res.status(400).json({ message: 'Pool not found' })
    }

    if (pool.status !== 'finished') {
      return res.status(400).json({ message: 'Pool not finished' })
    }

    if (user.id !== pool.ownerId) {
      return res.status(400).json({ message: 'User not owner of pool' })
    }

    await prisma.withdraw.create({
      data: {
        user_id,
        pool_id
      }
    })

    res.status(200).json({ message: 'Withdraw requested' })
    
  } catch (error) {
    res.status(500).json({ message: error })
  }
}