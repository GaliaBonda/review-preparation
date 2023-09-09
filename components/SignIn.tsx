import React, { FC, useState } from "react";
import { signIn, ClientSafeProvider } from "next-auth/react";
import { Form } from "./SignInForm";
import { Button, MenuItem, Popover, Typography } from "@mui/material";
import { BasicPopover } from "./BasicPopover";
import { BasicModal } from "./Modal";
import { CustomButton } from "./CustomButton";

type SignInProps = {
  provider: ClientSafeProvider;
  handleCloseUserMenu?: () => void;
};

export type CredentialsType = {
  username: string;
  password: string;
  email: string;
};

export const SignIn: FC<SignInProps> = ({ provider, handleCloseUserMenu }) => {
  const [credentials, setCredentials] = useState<CredentialsType>({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [formShown, setFormShown] = useState(false);

  if (provider.type === "oauth")
    return (
      <div>
        <MenuItem
          onClick={() => {
            signIn(provider.id, {callbackUrl: provider.id === 'github' ? '/github-callback' : undefined });
          }}
        >
          Sign in with {provider.name}
        </MenuItem>
      </div>
    );
  if (provider.type === "credentials")
    return (
      <>
        <MenuItem
          className="flex gap-3 md:gap-5"
          onClick={() => {setFormShown(true); handleCloseUserMenu?.();}}
        >
          <Typography textAlign="center">Sign in with password</Typography>
          {/* <BasicPopover title="Sign in with password"> */}

          {/* </BasicPopover> */}
          <BasicModal
            variant="ERROR"
            open={!!error}
            handleClose={() => {
              setError(null);
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              ERROR
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {`${error?.[0].toUpperCase()}${error?.slice(1)}`}
            </Typography>
          </BasicModal>
        </MenuItem>
        <BasicModal
          variant="BASIC"
          open={formShown}
          handleClose={() => {
            setFormShown(false);
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sign in form
          </Typography>
          <Form
            credentials={credentials}
            setCredentials={setCredentials}
            onSubmit={async (e) => {
              e.preventDefault();

              const res = await signIn("credentials", {
                redirect: false,
                ...credentials,
              });
              if (res?.error) {
                setError(res.error);
              }
            }}
          />
        </BasicModal>
      </>
    );
  return <></>;
};
