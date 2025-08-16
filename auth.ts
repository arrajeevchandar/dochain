import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma'; // Adjust path as needed
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                // Find user by email
                const user = await prisma.user.findUnique({
                    where: { email: String(credentials.email) },
                });
                if (!user || !user.hashedPassword) return null;

                // Check password
                const isValid = await bcrypt.compare(
                    String(credentials.password),
                    user.hashedPassword
                );
                if (!isValid) return null;

                // Make sure name is a string (fallback to empty string or username)
                return {
                    id: user.id,
                    name:
                        (typeof user.name === 'string' && user.name) ||
                        String(credentials.username) ||
                        '', // always string
                    email: user.email,
                };
            },
        }),
    ],
    session: { strategy: 'jwt' },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
});
