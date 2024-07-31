import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string; // Add role here
    } & DefaultSession['user']; // Extend with default properties
  }

  interface User {
    id: string;
    email: string;
    role: string; // Add role here
  }
}


