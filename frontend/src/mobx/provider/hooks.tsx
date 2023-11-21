import { Context, useContext } from "react";
// local
import { RootStore, AppStoreKeys } from "../stores";
import { rootStoreCtx } from "./context";

const useStoreData = <Selection, ContextData, Store>(
  context: Context<ContextData>,
  storeSelector: (contextData: ContextData) => Store,
  dataSelector: (store: Store) => Selection
) => {
  const value = useContext(context);
  if (!value) throw new Error();

  const store = storeSelector(value);

  return dataSelector(store);
};

export const useRootState = <Selection,>(
  dataSelector: (store: RootStore) => Selection
) => useStoreData(rootStoreCtx, (contextData) => contextData!, dataSelector);

export const createUseStateHook = <K extends AppStoreKeys>(prop: K) => {
  return <Selection,>(dataSelector: (store: RootStore[K]) => Selection) => {
    return dataSelector(useRootState((s) => s[prop]));
  };
};
