import { FC, PropsWithChildren } from "react";

type ButtonProps = {
    onClick: () => void;
    styles?: string;
  };
  
  export const Button: FC<PropsWithChildren<ButtonProps>> = ({
    children,
    styles,
    onClick,
  }) => {
    return (
      <button
        className={`${styles ? styles : "rounded  "}shadow p-2 border border-slate-200`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };