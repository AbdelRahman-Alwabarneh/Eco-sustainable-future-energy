import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authCallbacks } from "@/lib/authCallbacks";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  callbacks: authCallbacks,
  pages: {
    signIn: '/register',
  },
});

export { handler as GET, handler as POST };