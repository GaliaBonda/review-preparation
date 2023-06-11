import React, { FC } from "react";
import { signIn, ClientSafeProvider } from "next-auth/react";

type SignInProps = {
  provider: ClientSafeProvider;
};

export const SignIn: FC<SignInProps> = ({ provider }) => {
  if (provider.type === "oauth")
    return (
      <button
        type="button"
        key={provider.name}
        onClick={() => {
          signIn(provider.id);
        }}
        className="black_btn"
      >
        Sign in with {provider.name}
      </button>
    );
  if (provider.type === "credentials")
    return (
      <form className="flex flex-col max-w-md"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = new FormData(e.target as HTMLFormElement);
          console.log(e)

          await signIn("credentials", {redirect: false,
            username: form.get("username"),
            password: form.get("password"),
            email: form.get("email"),
            // callbackUrl: "/",
          });
        }}
      >
        <h2>Login</h2>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Submit</button>
      </form>
    );
  return <></>;
};
