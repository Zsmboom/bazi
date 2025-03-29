import NextAuth, { NextAuthOptions } from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb";

// Disable TLS/SSL verification for network requests to solve proxy issues
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      httpOptions: {
        timeout: 40000, // Increased timeout
      }
    }),
  ],
  // Enable MongoDB adapter to store user information in database
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    // Save additional user information to database if needed
    async signIn({ user, account, profile }: any) {
      return true;
    }
  },
  debug: true, // Enable debug mode to get more error information
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 