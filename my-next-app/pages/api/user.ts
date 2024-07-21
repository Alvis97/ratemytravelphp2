import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import prisma from '../../lib/prisma';

//secret key in the .env.local file
const secret = process.env.NEXTAUTH_SECRET;  

//Handles the request and response
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //variable for token but what is token?
  const token = await getToken({ req, secret });
  console.log("This is what we have inside the token: " + token);

  //JSON web token, like a letter with information. checks if token is undefined or null, or if the token dosnt include an email
  if (!token || !token.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  //If not, find the user
  try {
    const user = await prisma.user.findUnique({
      where: { email: token.email },
    });

    //If user isnt found
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
