import { RootStore } from "../stores";
import { BlockchainId } from "../data/supportedBlockchains";

export interface GenericStore {}

export interface StateStore extends GenericStore {
  root: RootStore;
}

export type AppStoreKeys = keyof RootStore;
export type AppStoreTypes = RootStore[AppStoreKeys];

export class Address {
  constructor(public value: string, public blockchainId: BlockchainId) {}
}
export class Contact {
  constructor(
    public id: string,
    public fullName: string,
    public addresses: Address[]
  ) {}
}
