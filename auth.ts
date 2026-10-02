import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    {
      id: "iedon",
      name: "iEdon",
      type: "oidc",
      issuer: 'https://oauth.dn42',
      clientId: process.env.AUTH_IEDON_ID,
      clientSecret: process.env.AUTH_IEDON_SECRET,
      authorization: {
        params: {
          scope: "openid profile email dn42",
        },
      },
    },
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) token.dn42 = profile.dn42;
      return token;
    },
    async session({ session, token }) {
      session.user.dn42 = token.dn42;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
