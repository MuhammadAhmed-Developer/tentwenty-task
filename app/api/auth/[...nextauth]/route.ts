import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const VALID_EMAIL = process.env.VALID_EMAIL || "";
const VALID_PASSWORD = process.env.VALID_PASSWORD || "";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        if (
          credentials.email === VALID_EMAIL &&
          credentials.password === VALID_PASSWORD
        ) {
          return {
            id: "1",
            email: VALID_EMAIL,
            name: "Admin User",
          };
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
