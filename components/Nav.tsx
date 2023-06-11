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

const Nav = () => {
  const { data: session } = useSession();

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
      <div>
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            {/* <Link href='/create-prompt' className='black_btn'>
            Create Post
          </Link> */}

            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>

            {/* <Link href='/profile'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
            />
          </Link> */}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <SignIn provider={provider} key={provider.name}/>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
