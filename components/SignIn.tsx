import React, { FC, useState } from "react";
import { signIn, ClientSafeProvider } from "next-auth/react";
import { Form } from "./Form";
import { Button, Popover, Typography } from "@mui/material";
import { BasicPopover } from "./BasicPopover";
import { BasicModal } from "./Modal";

type SignInProps = {
  provider: ClientSafeProvider;
};

export type CredentialsType = {
  username: string;
  password: string;
  email: string;
};

export const SignIn: FC<SignInProps> = ({ provider }) => {
  const [credentials, setCredentials] = useState<CredentialsType>({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState<string | null>(null);

  if (provider.type === "oauth")
    return (
      <div key={provider.name}>
        <Button
          variant="contained"
          onClick={() => {
            signIn(provider.id);
          }}
        >
          Sign in with {provider.name}
        </Button>
      </div>
    );
  if (provider.type === "credentials")
    return (
      <>
        <div className="relative" key={provider.name}>
          {/* <Button
          styles={`${formShown ? "rounded-t shadow-t" : "rounded shadow"}`}
          onClick={() => setFormShown((prev) => !prev)}
        >
          Sign in with login and password
        </Button> */}
          <BasicPopover title="Sign in with login and password">
            <Form
              credentials={credentials}
              setCredentials={setCredentials}
              onSubmit={async (e) => {
                e.preventDefault();
                const form = new FormData(e.target as HTMLFormElement);

                const res = await signIn("credentials", {
                  redirect: false,
                  ...credentials,
                  // username: form.get("username"),
                  // password: form.get("password"),
                  // email: form.get("email"),
                });
                if (res?.error) {
                  setError(res.error);
                }
              }}
            />
          </BasicPopover>
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
        </div>
      </>
    );
  return <></>;
};
