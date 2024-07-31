import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, countryId, rating } = req.body;

    try {
      const visitedCountry = await prisma.visitedCountry.create({
        data: {
          userId,
          countryId,
          rating, 
        },
      });
      res.status(200).json(visitedCountry);
    } catch (error) {
      console.error('Error creating visited country:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}

