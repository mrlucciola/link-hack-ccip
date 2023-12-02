import { RootStore } from "../stores";
import {
  BlockchainId,
  BlockchainInfo,
  getBlockchainInfo,
} from "../data/supportedBlockchains";

export interface GenericStore {}

export interface StateStore extends GenericStore {
  root: RootStore;
}

export type AppStoreKeys = keyof RootStore;
export type AppStoreTypes = RootStore[AppStoreKeys];

export class Address {
  constructor(
    public value: string,
    public blockchainId: BlockchainId,
    public label: string
  ) {}
  get blockchainInfo(): BlockchainInfo {
    return getBlockchainInfo(this.blockchainId);
  }
  // @todo add totalMktValue to state
  get totalMktValue(): number {
    return -10000;
  }
  get totalMktValueFmt(): string {
    return this.totalMktValue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD", // adjust for locale
      minimumFractionDigits: 2,
    });
  }
}
export const newAddress = (
  value: string,
  blockchainId: BlockchainId,
  label: string
): Address => new Address(value, blockchainId, label);

export class Contact {
  constructor(
    public id: string,
    public fullName: string,
    public addresses: Address[]
  ) {}
}
