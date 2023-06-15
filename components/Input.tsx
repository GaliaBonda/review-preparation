import React, { FC, HTMLInputTypeAttribute } from "react";

type InputProps = {
    label: string;
    value: string;
    required?: boolean;
    onChange: (value: string) => void;
    type?: HTMLInputTypeAttribute
}

export const Input: FC<InputProps> = ({onChange, value, label, required, type="text"}) => {
  return (
    <div>
      <label>{label}:</label>
      <input 
      onChange={(e) => onChange(e.target.value)} type={type} value={value} required={required} />
    </div>
  );
};
