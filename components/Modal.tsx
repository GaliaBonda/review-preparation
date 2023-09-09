import React, {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

type ModalProps = {
  variant: "ERROR" | "BASIC";
  open: boolean;
  handleClose: () => void;
};

export const BasicModal: FC<PropsWithChildren<ModalProps>> = ({
  open,
  handleClose,
  variant,
  children,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{backdrop: {style: {backgroundColor: 'rgba(0, 0, 0, 0.7)'}}}}
      >
        <div
          className={`rounded p-4 -translate-y-1/2 -translate-x-1/2 w-1/2 flex flex-col items-center justify-center shadow-xl absolute left-1/2 top-1/2 ${
            variant === "ERROR" ? "bg-red-500/60 text-white" : "bg-white"
          }`}
        >
          {children}
        </div>
      </Modal>
    </div>
  );
};
