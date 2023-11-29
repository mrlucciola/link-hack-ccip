import { FC, ReactNode } from "react";
import { useLocalObservable } from "mobx-react-lite";
// local
import { RootStore } from "../stores";
import { rootStoreCtx } from "./context";
import { GenericStore } from "../interfaces";

type Class<S extends GenericStore> = new (...args: any[]) => S;

export const newStoreProvider = <S extends GenericStore>(
  storeCtx: React.Context<S | null>,
  storeClass: Class<S>
) => {
  const store = useLocalObservable(() => new storeClass());

  return ({ children }: { children: ReactNode }) => (
    <storeCtx.Provider value={store}>{children}</storeCtx.Provider>
  );
};

export const StoreProvider: FC<{ children: ReactNode }> = newStoreProvider(
  rootStoreCtx,
  RootStore
);
