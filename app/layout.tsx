import Provider from "@components/Provider";
import "@styles/globals.css";
import { Session } from "next-auth";
import { FC, PropsWithChildren } from "react";

export const metadata = {
  title: "Review preparation",
  description: "Review preparation: questions and maybe answers",
};

const layout: FC<PropsWithChildren<{session: Session | undefined | null}>> = ({ children, session }) => {
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="main"></div>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default layout;
