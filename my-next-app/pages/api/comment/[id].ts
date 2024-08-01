// pages/api/comment/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Adjust the path to your prisma instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const comment = await prisma.comment.findUnique({
          where: { id: parseInt(id as string, 10) },
        });
        if (comment) {
          res.status(200).json(comment);
        } else {
          res.status(404).json({ error: 'Comment not found' });
        }
      } catch (error) {
        console.error('Error fetching comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'DELETE':
      try {
        const comment = await prisma.comment.delete({
          where: { id: parseInt(id as string, 10) },
        });
        res.status(200).json(comment);
      } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
