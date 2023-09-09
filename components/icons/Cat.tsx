import React, { FC, SVGProps } from "react";

export const Cat: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
    {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M20 3v10a8 8 0 1 1 -16 0v-10l3.432 3.432a7.963 7.963 0 0 1 4.568 -1.432c1.769 0 3.403 .574 4.728 1.546l3.272 -3.546z"></path>
      <path d="M2 16h5l-4 4"></path>
      <path d="M22 16h-5l4 4"></path>
      <path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
      <path d="M9 11v.01"></path>
      <path d="M15 11v.01"></path>
    </svg>
  );
};
