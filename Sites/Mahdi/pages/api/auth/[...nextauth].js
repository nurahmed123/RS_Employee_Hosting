import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const user = await User.findOne({ email: credentials.email });
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { ...user._doc, id: user._id }; // Assuming user data is in user._doc
        }
        throw new Error('Invalid credentials');
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id; // Store user ID in JWT
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token; // Store the JWT token in the session
      return session;
    }
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  pages: {
    signIn: '/login',
  },
});
