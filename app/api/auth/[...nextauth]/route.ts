import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider, {
  CredentialInput,
} from "next-auth/providers/credentials";

import { connectToDB } from "@utils/database";

import User from "@models/user";
import { Account, NextAuthOptions, Profile } from "next-auth";

const handler: NextAuthOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        await connectToDB();

        const userExist = await User.findOne({
          username: credentials?.username,
        });
        
        if (userExist) return userExist;
        if (!userExist) {
          const user = await User.create({
            username: credentials?.username,
            email: credentials?.email,
          });
          console.log(user)
        if (user) return user;
        }

        return null;
        // const authResponse = await fetch("api/auth/signin", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(credentials),
        // });

        // if (!authResponse.ok) {
        //   return null;
        // }

        // const user = await authResponse.json();

        // return user;
      },
    }),
  ],

  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user?.email });
      console.log(sessionUser)
      if (session.user) {
        session.user.id = sessionUser._id.toString();
      }
      } catch (error) {
        console.log(error)
      }
      

      return session;
    },

    async signIn(params: {
      account: Account | null;
      profile?: Profile;
      credentials?: Record<string, CredentialInput>;
    }) {
      
      const { profile, credentials } = params;

      if (credentials) {
        return false;
      }

      try {
        await connectToDB();

        const userExist = await User.findOne({ email: profile?.email });

        if (!userExist) {
          await User.create({
            email: profile?.email,
            username: profile?.email?.split("@")[0],
            image: profile?.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
