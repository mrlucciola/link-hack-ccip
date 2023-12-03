import { BlockchainId } from "../../mobx/data/supportedBlockchains";
import { TokenId } from "../../mobx/data/tokens";
import { Contact } from "../../mobx/interfaces";
import { Address } from "../../mobx/interfaces/address";

export class Recipient {
  constructor(public contact: Contact, public address: Address) {}
}
export const newRecipient = (contact: Contact, address: Address) =>
  new Recipient(contact, address);

export class EnabledAddr implements Pick<Address, "value"> {
  constructor(
    public value: string,
    public blockchainId: BlockchainId,
    public spendLimit: number,
    public tokens: { [key in TokenId]: EnabledAddrToken }
  ) {}
  get lookupId(): string {
    return `${this.blockchainId}-${this.value}`;
  }
  get isEnabled(): boolean {
    return this.spendLimit > 0;
  }
}
export const newEnabledAddr = (
  value: string,
  blockchainId: BlockchainId,
  spendLimit: number,
  tokens?: { [key in TokenId]: EnabledAddrToken }
): EnabledAddr => {
  return new EnabledAddr(
    value,
    blockchainId,
    spendLimit,
    tokens || ({} as { [key in TokenId]: EnabledAddrToken })
  );
};

export class EnabledAddrToken {
  constructor(public spendLimit: number, public isEnabled: boolean) {}
}
export const newEnabledAddrToken = (
  spendLimit: number,
  isEnabled: boolean = false
): EnabledAddrToken => {
  return new EnabledAddrToken(spendLimit, isEnabled);
};
