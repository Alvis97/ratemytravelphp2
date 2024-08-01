import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import prisma from '../../lib/prisma';

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const token = await getToken({ req, secret });

    if (!token || !token.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const { commentId, reason } = req.body;

      if (!commentId || !reason) {
        return res.status(400).json({ error: 'Comment ID and reason are required' });
      }

      const user = await prisma.user.findUnique({
        where: { email: token.email },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const newReport = await prisma.report.create({
        data: {
          reason,
          commentId: parseInt(commentId, 10),
          userId: user.id,
          date: new Date(),
        },
      });

      res.status(200).json(newReport);
    } catch (error) {
      console.error('Error reporting comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
