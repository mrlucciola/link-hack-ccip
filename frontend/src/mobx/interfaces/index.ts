import { RootStore } from "../stores";

export interface GenericStore {}

export interface StateStore extends GenericStore {
  root: RootStore;
}

export type AppStoreKeys = keyof RootStore;
export type AppStoreTypes = RootStore[AppStoreKeys];
