import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google, 
    Email,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Replace with your own user validation logic
        if (credentials?.email === "user@example.com" && credentials?.password === "password123") {
          return { id: "1", name: "Demo User", email: credentials.email };
        }
        // Return null if authentication fails
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  trustHost: true,
});
