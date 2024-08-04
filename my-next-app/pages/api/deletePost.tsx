// pages/api/deleteComment.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma'; // Adjust the path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    // Ensure id is a string and convert it to a number
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const numericId = Number(id);

    // Validate if the conversion was successful and the result is a valid number
    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
      await prisma.post.delete({
        where: { id: numericId }, // Use numericId here
      });
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}