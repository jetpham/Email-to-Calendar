import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    scope: 'https://www.googleapis.com/auth/gmail.readonly',
                        // Add other scopes if necessary
                },
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
        // Add other callbacks as needed
    },
});

export { handler as GET, handler as POST };
