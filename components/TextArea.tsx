import { TextareaAutosize, Typography } from "@mui/material";
import React, { ChangeEvent, FC } from "react";

type TextAreaProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  placeholder?: string;
  required?: boolean;
};

export const TextArea: FC<TextAreaProps> = ({
  required,
  onChange,
  value,
  label,
  placeholder,
}) => {
  return (
    <label className="flex flex-col gap-2">
      <Typography>{label}</Typography>
      <TextareaAutosize
        minRows={3}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="p-2 border border-slate-200 rounded"
      />
    </label>
  );
};
