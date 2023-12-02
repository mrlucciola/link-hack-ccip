import { Address, Contact } from "../../mobx/interfaces";

export class Recipient {
  constructor(public contact: Contact, public address: Address) {}
}
export const newRecipient = (contact: Contact, address: Address) =>
  new Recipient(contact, address);

export class EnabledAddr implements Pick<Address, "value"> {
  constructor(
    public value: string,
    public spendLimit: number,
    public isEnabled: boolean
  ) {}
}
export const newEnabledAddr = (
  value: string,
  spendLimit: number,
  isEnabled: boolean
): EnabledAddr => {
  return new EnabledAddr(value, spendLimit, isEnabled);
};
