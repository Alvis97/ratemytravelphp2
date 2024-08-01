// pages/api/signUp.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import prisma from '../../lib/prisma'; // Adjust the import path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { fName, lName, age, gender, pronounce, email, pwd, avatar } = req.body;

         // Convert age to integer
         const ageInt = parseInt(age, 10);

      // Hash the password before storing it
      const hashedPassword = await hash(pwd, 10);

      // Determine user role based on email
      const role = email === 'admin-rmt@admin.com' ? 'admin' : 'user';

      // Create user in the database
      const newUser = await prisma.user.create({
        data: {
          firstName: fName,
          lastName: lName,
          age: ageInt,
          gender,
          pronounce,
          email,
          password: hashedPassword,
          Image: avatar,
          role,
        },
      });

      res.status(200).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

