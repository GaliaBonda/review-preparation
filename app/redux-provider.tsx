"use client";

import { store } from "@store";
import { PropsWithChildren, FC } from "react";
import { Provider } from "react-redux";

export const ReduxProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
    return (
        <Provider store={store}>{children}</Provider>
    );
};