import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/pages/api/data/prisma-client'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const address = req.body

    if (!address) {
      return res.status(400).json({ message: 'Address is required' })
    }

    const user = await prisma.user.findUnique({
      where: {
        wallet: address,
      },

      include: {
        pools: {
          include: {
            contributions: true,
          }
        }
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.role === 'admin') {
      const withdraws = await prisma.withdraw.findMany({
        where: {
          status: 'pending',
        },
        include: {
          pool: {
            include: {
              contributions: true,
            }
          }
        }
      })

      let appConfig;

      appConfig = await prisma.appConfig.findUnique({
        where: {
          id: 1
        }
      })

      if (!appConfig) {
        appConfig = await prisma.appConfig.create({
          data: {
            id: 1,
            address_default: address,
            tax_rate: 10,
          }
        })
      }

      return res.status(200).json({
        user,
        withdraws,
        appConfig
      })
    }

    return res.status(200).json({
      user,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}