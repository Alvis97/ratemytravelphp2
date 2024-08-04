import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Retrieve the session
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized: No session found' });
  }

  try {
    // Delete the user from the database
    await prisma.user.delete({
      where: { email: session.user.email },
    });

    // Optionally: Logout the user after deletion
    // await signOut({ redirect: false });

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
