import NextAuth from "next-auth";
import { loginService } from "../service/login.service";
import Credentials from "next-auth/providers/credentials";
export const { handlers, signIn, signOu, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await loginService(credentials);
            return response;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.user.id,
          accessToken: token.user.payload.accessToken,
        };
      }
      return session;
    },
  },
});
