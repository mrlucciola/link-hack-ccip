// react
import { createContext } from "react";
// local
import { GenericStore } from "../interfaces";
import { RootStore } from "../stores";

export type StoreType<S> = ReturnType<() => S>;

// context
const createStoreCtx = <S extends GenericStore>() =>
  createContext<S | null>(null);

export const rootStoreCtx = createStoreCtx<RootStore>();
