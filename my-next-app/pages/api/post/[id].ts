import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const postId = parseInt(id as string, 10); // Convert id to a number

      if (isNaN(postId)) {
        return res.status(400).json({ error: 'Invalid post ID' });
      }

      console.log(`Fetching post with ID: ${postId}`);

      const post = await prisma.post.findUnique({
        where: { id: postId },
      });

      console.log(`Post fetched: ${JSON.stringify(post)}`);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const postId = parseInt(id as string, 10); // Convert id to a number

      if (isNaN(postId)) {
        return res.status(400).json({ error: 'Invalid post ID' });
      }

      console.log(`Deleting post with ID: ${postId}`);

      const deletedPost = await prisma.post.delete({
        where: { id: postId },
      });

      console.log(`Post deleted: ${JSON.stringify(deletedPost)}`);

      res.status(200).json(deletedPost);
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}




