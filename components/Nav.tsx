"use client";

import { BuiltInProviderType } from "next-auth/providers";
import {
  useSession,
  getProviders,
  signIn,
  ClientSafeProvider,
  LiteralUnion,
  signOut,
} from "next-auth/react";
import React, { useEffect, useState } from "react";
import { SignIn } from "./SignIn";
import { Button } from "@mui/material";

const Nav = () => {
  const { data: session } = useSession();

  console.log(session);

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div>
      <div className="flex gap-3 py-4">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Button variant="contained" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <SignIn provider={provider} key={provider.name} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
