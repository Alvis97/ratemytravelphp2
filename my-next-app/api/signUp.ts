// pages/api/signup.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, firstName, lastName, age, gender, pwd } = req.body;

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(pwd, 10);

      // Create new user
      const user = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          age,
          gender,
          password: hashedPassword,
        },
      });

      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
