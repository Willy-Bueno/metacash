import prisma from './data/prisma-client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { tax_rate, address_default } = req.body

    if (tax_rate && address_default) {
      await prisma.appConfig.update({
        where: {
          id: 1
        },
        data: {
          tax_rate,
          address_default
        }
      })

      res.status(200).json({ message: 'App config updated' })
    } else if (tax_rate && !address_default) {
      await prisma.appConfig.update({
        where: {
          id: 1
        },
        data: {
          tax_rate
        }
      })

      res.status(200).json({ message: 'App config updated' })
    } else if (!tax_rate && address_default) {
      await prisma.appConfig.update({
        where: {
          id: 1
        },
        data: {
          address_default
        }
      })

      res.status(200).json({ message: 'App config updated' })
    } else {
      res.status(400).json({ message: 'Invalid request' })
    }

  } catch (error) {
    console.log("Error: ", error)
  }
}