import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from 'bcryptjs';
import { randomBytes } from "crypto"; // Importa el módulo para generar contraseñas aleatorias


export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        // Buscar usuario en la base de datos por el correo proporcionado por Google
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string }, // Aseguramos que `email` no es null
        });
    
        // Si el usuario no existe, lo creamos
        if (!existingUser) {
          const randomPassword = randomBytes(16).toString('hex');
          const hashedPassword = bcryptjs.hashSync(randomPassword, 10);
    
          await prisma.user.create({
            data: {
              name: user.name || profile?.name || 'Usuario sin nombre',
              email: user.email as string,  // Aseguramos que `email` no es null
              password: hashedPassword,
              role: 'user',
            },
          });
        }
      }
    
      return true;  // Continúa el flujo de autenticación
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },

    session({ session, token }) {
      session.user = token.data as any;
      return session;
    }
  },

  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // Credentials Provider
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Buscar el correo y contraseña
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (!user) return null;

        // Compara contraseñas
        if (!bcryptjs.compareSync(password, user.password)) return null;

        // Regresar el usuario sin el password
        const { password: _, ...rest } = user;
        console.log(bcryptjs.hashSync(_))

        return rest;
      },
    }),
  ],
};

// Export NextAuth setup
export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);