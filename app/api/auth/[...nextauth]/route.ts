import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Constant credentials for authentication
const VALID_EMAIL = "admin@tentwenty.com";
const VALID_PASSWORD = "admin123";

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

        // Compare with constant credentials
        if (
          credentials.email === VALID_EMAIL &&
          credentials.password === VALID_PASSWORD
        ) {
          // Return user object on successful authentication
          return {
            id: "1",
            email: VALID_EMAIL,
            name: "Admin User",
          };
        }

        // Return null if credentials don't match
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
