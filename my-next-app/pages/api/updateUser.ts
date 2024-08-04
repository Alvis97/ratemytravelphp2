import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma'; // Ensure you import your Prisma client correctly



// Define the expected shape of the user data
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  pronounce: string;
  Image: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const userData: User = req.body;
      console.log(userData);

      // Validate incoming data
      if (!userData.id) {
        return res.status(400).json({ error: 'User ID is required' });
      }

       // Ensure age is a number
       const age = parseInt(userData.age as unknown as string, 10);

      // Update the user in the database
      const user = await prisma.user.update({
        where: { id: userData.id },
        data: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          age: userData.age,
          gender: userData.gender,
          pronounce: userData.pronounce,
          Image: userData.Image,
        },
      });

      // Send the updated user data as the response
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


{/**
import { NextApiRequest, NextApiResponse } from 'next';
import  prisma  from '../../lib/prisma'; // Ensure you import your Prisma client correctly

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // Parse the request body to get the updated user data
      const updatedUser = req.body;

      // Validate incoming data
      if (!updatedUser.id) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      // Update the user in the database
      const user = await prisma.user.update({
        where: { id: updatedUser.id },
        data: {
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          age: updatedUser.age,
          gender: updatedUser.gender,
          pronounce: updatedUser.pronounce,
        },
      });

      // Send the updated user data as the response
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
*/}