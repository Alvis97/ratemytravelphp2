// pages/api/addReport.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma'; // Adjust the path to your Prisma client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { reason, postId, userId, date } = req.body;

    try {
      const newReport = await prisma.report.create({
        data: {
          reason,
          postId: parseInt(postId, 10),
          userId,
          date: new Date(date),
        },
      });

      res.status(200).json(newReport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create report' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
