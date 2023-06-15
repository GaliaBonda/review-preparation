import { Button, Popover } from "@mui/material";
import React, { FC, PropsWithChildren, useEffect, useRef, useState } from 'react'

export const BasicPopover: FC<PropsWithChildren<{title: string}>> = ({title, children}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
const [width, setWidth] = useState<number | undefined>(undefined);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
      if (buttonRef.current) {
        setWidth(buttonRef.current.clientWidth)
      }  
    }, [buttonRef]);
  
    return (
      <div className="flex flex-col">
        <Button ref={buttonRef} aria-describedby={id} variant="contained" onClick={handleClick}>
          {title}
        </Button>
        <Popover
        disablePortal={true}
        style={{width}}
        className="mt-2"
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          slotProps={{paper: {style: {width, maxWidth: width}}}}
        >
          {children}
        </Popover>
      </div>
    );
}

