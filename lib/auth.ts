import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { users, accounts, sessions, verificationTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

class CustomAuthError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const dbUsers = await db.select().from(users).where(eq(users.email, email));
        
        if (dbUsers.length === 0) {
          throw new CustomAuthError("Email tidak terdaftar. Silakan buat akun dahulu.");
        }
        
        const user = dbUsers[0];
        
        if (!user.password) {
          throw new CustomAuthError("Email ini terdaftar via Google. Silakan masuk menggunakan Google.");
        }

        const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password);
        if (!passwordsMatch) {
          throw new CustomAuthError("Kata sandi yang Anda masukkan salah.");
        }

        if (!user.emailVerified) {
          throw new CustomAuthError("Alamat email belum diverifikasi. Cek kotak masuk Anda.");
        }

        return user;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      const userId = (token?.id as string) || (token?.sub as string) || user?.id;
      
      if (session.user && userId) {
        session.user.id = userId;
        
        const dbUser = await db.select().from(users).where(eq(users.id, userId));
        if (dbUser.length > 0) {
          // @ts-expect-error adding custom properties to session user
          session.user.role = dbUser[0].role;
          // @ts-expect-error adding custom properties to session user
          session.user.status = dbUser[0].status;
        }
      }
      return session;
    },
  },
});
