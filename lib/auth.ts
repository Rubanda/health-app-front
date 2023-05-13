import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password,
                    }),
                });
                const user = await res.json();
                if (user.token) {

                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            const dbUser:any = token?.user;

            // return {
            //     id: dbUser.user.id,
            //     name: dbUser?.user.name,
            //     email: dbUser?.user?.email,
            //     picture: dbUser?.user.avatar,
            //     role: dbUser?.user.role,
            //     token: token.token,
                
            //   }
            return { ...token,...user };
        },
        async session({ token, session }:any) {
            if (token) {
                session.user.id = token?.user.id
                session.user.name = token.user.name
                session.user.email = token.user.email
                session.user.image = token.user.avatar
                session.user.role = token.user.roles
                session.user.token = token.token
            }
            // session.user = token as any;
            return session;
        },
    },

};

export default NextAuth(authOptions);
