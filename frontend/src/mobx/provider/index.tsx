import { FC, ReactNode } from "react";
import { useLocalObservable } from "mobx-react-lite";
// local
import { RootStore } from "../stores";
import { rootStoreCtx } from "./context";

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const store = useLocalObservable(() => new RootStore());

  return (
    <rootStoreCtx.Provider value={store}>{children}</rootStoreCtx.Provider>
  );
};
