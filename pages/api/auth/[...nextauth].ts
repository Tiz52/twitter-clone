import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({session, token}) {
			// Save the token to the session
			session.user.tag = session.user?.name?
			.split(" ")
			.join("")
			.toLocaleLowerCase();
			// Save the token to the database
			session.user.uid = token.sub;
			return session;
			},
		},

});
