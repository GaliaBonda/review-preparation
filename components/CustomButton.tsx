import Button from "@mui/material/Button";
import React, {
  ButtonHTMLAttributes,
  FC,
  MouseEvent,
  MutableRefObject,
  PropsWithChildren,
} from "react";

type CustomButtonProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  buttonRef?: MutableRefObject<HTMLButtonElement | null>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: ButtonHTMLAttributes<HTMLButtonElement>["className"];
  disabled?: boolean;
};

export const CustomButton: FC<PropsWithChildren<CustomButtonProps>> = ({
  onClick,
  children,
  buttonRef,
  type,className,disabled
}) => {
  return (
    <Button disabled={disabled} className={className} color="primary" size="small" variant="contained" ref={buttonRef} type={type} onClick={onClick}>
      {children}
    </Button>
  );
};
