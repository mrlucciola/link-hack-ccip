import { RootStore } from "../stores";
import { Address } from "./address";

export interface GenericStore {}

export interface StateStore extends GenericStore {
  root: RootStore;
}

export type AppStoreKeys = keyof RootStore;
export type AppStoreTypes = RootStore[AppStoreKeys];

export class Contact {
  constructor(
    public id: string,
    public fullName: string,
    public addresses: Address[]
  ) {}
}
