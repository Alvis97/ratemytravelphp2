import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || 'default_secret_key';

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Connected to the database successfully.');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw new Error('Database connection failed');
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    console.log("Received request with email", email);

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      console.log('User found:', user);

      if (!user) {
        console.log('Invalid email or password');
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password valid:', isPasswordValid);

      if (!isPasswordValid) {
        console.log('Invalid email or password');
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user.id }, secret, {
        expiresIn: '1h',
      });

      console.log('JWT token created:', token);

      const isAdmin = email === 'admin-rmt@admin.com';

      if (isAdmin) {
        res.status(200).json({ token, user: { ...user, role: 'admin' } });
      } else {
        res.status(200).json({ token, user: { ...user, role: 'user' } });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


