// pages/api/signup.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// helps prisma and env
dotenv.config();

//will be interacting with database
const prisma = new PrismaClient();

// Function to check the database connection
async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Connected to the database successfully.');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw new Error('Database connection failed');
  }
}

//Handles http request                    request, respose
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Received request:', req.method, req.url);
  console.log('Request body:', req.body);

  if (req.method === 'POST') {
    //storing all input values from the body
    const {  fName, lName, age, gender, pronounce, email, pwd, avatar } = req.body;

      // Check database connection
 // try {
  //  await checkDatabaseConnection();
  //} catch (error) {
   // return res.status(500).json({ error: 'Database connection failed' });
  // }

    try {
      console.log('Received data:', { email, fName, lName, age, gender, pronounce, pwd, avatar });

      // Hash the password
      const hashedPassword = await bcrypt.hash(pwd, 10);

      // Create new user
      const user = await prisma.user.create({
        data: {
          
          firstName: fName,
          lastName: lName,
          age: age,
          gender: gender,
          pronounce: pronounce,
          email: email,
          password: hashedPassword,
          Image: avatar, // Default value for Image
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
