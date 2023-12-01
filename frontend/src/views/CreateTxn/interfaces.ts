import { Address, Contact } from "../../mobx/interfaces";

export class Recipient {
  constructor(public contact: Contact, public address: Address) {}
}
export const newRecipient = (contact: Contact, address: Address) =>
  new Recipient(contact, address);
