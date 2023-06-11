import NextAuth,  {Profile, Session } from "next-auth";


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Profile extends Profile {
    email: string;
    username: string;
    picture: string;
  }

  interface Session extends Session {
    user: {
      id: string;
      email: string;
      usernams: string;
      image: string;
    }
  }
}
