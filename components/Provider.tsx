'use client';

import React, { PropsWithChildren, FC } from "react";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const Provider: FC<
  PropsWithChildren<{session: Session | undefined | null}>
> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
