import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './data/prisma-client'

type Data = {
  address: string
  amount: string
  hash_tx: string
  poolId: number
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const requiredFields = ['address', 'amount', 'hash_tx', 'poolId']

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `Missing field: ${field}` })
      }
    }

    const { address, amount, hash_tx, poolId }: Data = req.body

    const user = await prisma.user.findUnique({
      where: {
        wallet: address
      }
    })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const contribution = await prisma.contribution.create({
      data: {
        amount,
        owner_wallet: address,
        userId: user.id,
        hash_tx,
        poolId
      }
    })

    const pool = await prisma.pool.findUnique({
      where: {
        id: poolId
      }
    })

    if (!pool) {
      return res.status(400).json({ message: 'Pool not found' })
    }

    const raisedAmount = pool.raisedAmount !== null ? pool.raisedAmount + Number(amount) : Number(amount)

    await prisma.pool.update({
      where: {
        id: poolId
      },
      data: {
        raisedAmount
      }
    })

    res.status(200).json(contribution)

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}