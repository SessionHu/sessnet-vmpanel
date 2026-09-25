import NextAuth from "next-auth"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    {
      id: "iedon",
      name: "iEdon",
      type: "oidc",
      issuer: process.env.AUTH_ISSUER,
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
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
      if (profile) {
        token.dn42 = profile.dn42
      }
      return token
    },
    async session({ session, token }) {
      session.user.dn42 = token.dn42
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
