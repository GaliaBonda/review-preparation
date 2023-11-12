"use client"

import { ResponsiveAppBar } from "@components/CustomAppBar";
import { Footer } from "@components/Footer";
import React, { FC, PropsWithChildren } from "react";

const layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      <main className="basis-full p-4 grow-1">
        <div className="layout-2">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default layout;
