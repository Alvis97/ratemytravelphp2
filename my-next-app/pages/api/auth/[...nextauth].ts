// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    CredentialsProvider({
        async authorize(credentials) {
            const user = await prisma.user.findUnique({
                where: { email: credentials?.email },
            });

            if (user && (await bcrypt.compare(credentials.password, user.password))) {
                return { id: user.id, email: user.email };
            } else {
                throw new Error('Invalid email or password');
            }
        },
        credentials: undefined
    }),
    // Add other providers here if needed
  ],
  pages: {
    signIn: '/auth/logIn', // Custom sign-in page
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
        };
      }
      return session;
    },
  },
});


