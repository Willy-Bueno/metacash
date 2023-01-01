import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/pages/api/data/prisma-client'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const requiredFields = ['id', 'status']

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: 'Missing field' })
      }
    }

    const { id, amount, hash_tx, status } = req.body

    const withdraw = await prisma.withdraw.findUnique({
      where: {
        id,
      },
    })

    if (!withdraw) {
      return res.status(404).json({ message: 'Withdraw not found' })
    }

    const updatedWithdraw = await prisma.withdraw.update({
      where: {
        id,
      },
      data: {
        amount,
        hash_tx,
        status,
      },
    })

    return res.status(200).json(updatedWithdraw)

  } catch (error: any) {
    console.error(error)
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message
    })
  }
}