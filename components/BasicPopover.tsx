import { Button, Popover, Typography } from "@mui/material";
import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { CustomButton } from "./CustomButton";

export const BasicPopover: FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [width, setWidth] = useState<number | undefined>(undefined);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      setWidth(buttonRef.current.clientWidth);
    }
  }, [buttonRef]);

  return (
    <div>
      <button
        className="px-4 py-[6px] w-full"
        ref={buttonRef}
        aria-describedby={id}
        onClick={handleClick}
      >
        <Typography textAlign="center">{title}</Typography>
      </button>
      <Popover
        disablePortal={true}
        style={{ width }}
        className={`mt-1`}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            style: {
              width,
              maxWidth: width,
              borderTopLeftRadius: open ? "0px" : "4px",
              borderTopRightRadius: open ? "0px" : "4px",
            },
          },
        }}
      >
        {children}
      </Popover>
    </div>
  );
};
