import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    console.log('Session in API Route:', session);

    if (!session || !session.user) {
      console.error('Unauthorized: No session or user posts found');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const posts = await prisma.post.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        date: 'desc', // Adjust if necessary
      },
    });

    console.log('Fetched Posts:', posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}