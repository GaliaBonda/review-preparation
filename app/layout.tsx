"use client";

import { ResponsiveAppBar } from "@components/CustomAppBar";
import { Footer } from "@components/Footer";
import Provider from "@components/Provider";
import { store } from "@store";

import "@styles/globals.css";
import "@styles/reset.css";
import { Session } from "next-auth";
import { FC, PropsWithChildren } from "react";
import Providers from "./provider";
import { ReduxProvider } from "./redux-provider";

export const metadata = {
  title: "Review preparation",
  description: "Review preparation: questions and maybe answers",
};

const layout: FC<
  PropsWithChildren<{ session: Session | undefined | null }>
> = ({ children, session }) => {
  return (
    <html className="h-screen w-screen" lang="en">
      <body className="h-screen flex flex-col">
        <ReduxProvider>
          <Provider session={session}>
          
            <ResponsiveAppBar />
            <main className="basis-full p-4 grow-1">{children}</main>
            <Footer />
         
        </Provider> 
        </ReduxProvider>
      </body>
    </html>
  );
};

export default layout;
