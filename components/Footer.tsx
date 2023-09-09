import { Typography } from "@mui/material";
import React from "react";
import { Love } from "./icons/Love";

export const Footer = () => {
  return (
    <footer className="bg-[#1976d2] flex basis-[12vh] text-white items-center justify-center">
      <Typography className="flex items-center gap-2">
        Created with <Love fill="white" color="white" />
      </Typography>
    </footer>
  );
};
