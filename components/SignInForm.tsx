import { FormControl, Button, TextField } from "@mui/material";
import React, {
  CSSProperties,
  FC,
  FormEvent,
  SetStateAction,
} from "react";
import { CredentialsType } from "./SignIn";
import { CustomButton } from "./CustomButton";

type FormProps = {
  credentials: CredentialsType;
  setCredentials: (value: SetStateAction<CredentialsType>) => void;
  onSubmit: (e: FormEvent) => void;
};

export const Form: FC<FormProps> = ({
  credentials,
  setCredentials,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 p-2 pt-4">
      <FormControl className="relative py-2">
        <TextField
        label="Login"
        variant="outlined"
          id="username"
          required
          value={credentials.username}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, username: e.target.value }))
          }
        />
      </FormControl>
      <FormControl className="relative  py-2">
        
        <TextField
        label="Email"
          id="email"
          required
          value={credentials.email}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </FormControl>
      <FormControl className="relative  py-2">
        
        <TextField
        label="Password"
          id="password"
          required
          value={credentials.password}
          type="password"
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </FormControl>
      <CustomButton type="submit">Submit</CustomButton>
    </form>
  );
};
