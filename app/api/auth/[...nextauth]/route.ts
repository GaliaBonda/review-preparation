import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider, {
  CredentialInput,
} from "next-auth/providers/credentials";

import { connectToDB } from "@utils/database";

import User from "@models/user";
import { Account, NextAuthOptions, Profile } from "next-auth";
import bcrypt from "bcrypt";

const saltRounds = 10;

const handler: NextAuthOptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
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
        if (!credentials?.password) return false;

        await connectToDB();

        const userExist = await User.findOne({
          email: credentials?.email,
          username: credentials?.username,
        });

        if (userExist) {
          const match = await bcrypt.compare(
            credentials.password,
            userExist.password
          );
          if (!match) {
            throw new Error('wrong password')
          } else {
            return userExist;
          }
          
        }

        //user1
        //user1@gmail.com
        //user1

        if (!userExist) {
          const hash = await bcrypt.hash(credentials?.password, saltRounds);
          if (!hash) return false;

          const user = await User.create({
            username: credentials?.username,
            email: credentials?.email,
            password: hash,
          });
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
    async session({ session, user }) {
      try {
        const sessionUser = await User.findOne({ email: session.user?.email });
        if (session.user && sessionUser) {
          session.user.id = sessionUser._id.toString();
          session.user.username = sessionUser.username;
        }
      } catch (error) {
        console.log(error);
      }

      return session;
    },

    

    async signIn(params: {
      account: Account | null;
      profile?: Profile;
      credentials?: Record<string, CredentialInput>;
    }) {
      const { profile, credentials, account } = params;

      // if (account?.provider === 'github') {

      // }

      try {
        await connectToDB();

        const userExist = await User.findOne({ email: profile?.email });

        if (credentials) return true;

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
