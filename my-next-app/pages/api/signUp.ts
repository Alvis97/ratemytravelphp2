// pages/api/signup.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// helps prisma and env
dotenv.config();

//will be interacting with database
const prisma = new PrismaClient();

//Handles http request                    request, respose
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Received request:', req.method, req.url);
  console.log('Request body:', req.body);

  if (req.method === 'POST') {
    //storing all input values from the body
    const { email, fName, lName, age, gender, pwd } = req.body;

    try {
      console.log('Received data:', { email, fName, lName, age, gender, pwd });

      // Hash the password
      const hashedPassword = await bcrypt.hash(pwd, 10);

      // Create new user
      const user = await prisma.user.create({
        data: {
          email: email,
          firstName: fName,
          lastName: lName,
          age: age,
          gender: gender,
          password: hashedPassword,
          Image: '', // Default value for Image
        },
      });

      console.log('User created:', user);
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
