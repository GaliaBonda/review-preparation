'use client';

import { useSession } from "next-auth/react";
import React from "react";

const GitHubCallback = async () => {
    const session = useSession();

    // console.log(session)

  return (
    <></>
  );
};

export default GitHubCallback;
