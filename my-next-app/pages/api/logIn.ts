// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


// helps prisma and env
dotenv.config();

//will be interacting with database
const prisma = new PrismaClient();
//secret key
const secret = process.env.JWT_SECRET || 'default_secret_key';

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


//Handles http request  
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    console.log("Received request with email", email);

    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      console.log('User found:', user);

      if (!user) {
        console.log('invalid email or password');
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password valid:', isPasswordValid);

      if (!isPasswordValid) {
        console.log('Invalid email or password');
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Create JWT token
      const token = jwt.sign({ userId: user.id }, secret, {
        expiresIn: '1h', // Token expires in 1 hour
      });

      console.log('JWT token created:', token)

      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

