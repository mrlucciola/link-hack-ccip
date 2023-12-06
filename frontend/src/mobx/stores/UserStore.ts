// state
import { makeAutoObservable } from "mobx";
// stores
import { RootStore } from ".";
// interfaces
import { Contact, StateStore } from "../interfaces";
import { Address } from "../interfaces/address";
import {
  SignedTransaction,
  newSignedTransaction,
  Transaction,
} from "../interfaces/transaction";
// seed data
import { seedContactsMap, seedAddressesMap } from "../data/seed-user";

/** ## User store
 */
export class UserStore implements StateStore {
  // ctor
  constructor(public root: RootStore) {
    // init
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /////////////////////////////////////////////////////////
  ////////////////////// OBSERVABLES //////////////////////
  // @todo remove the seed data when done testing
  contacts: Map<string, Contact> = seedContactsMap;
  addresses: Map<string, Address> = seedAddressesMap;
  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// ACTIONS ////////////////////////
  /** ### Add/update single contact to `contacts` collection. */
  setContact(newContact: Contact) {
    this.contacts.set(newContact.id, newContact);
  }
  /** ### Set `contacts` state variable.
   * ### Warning: this replaces the original set. */
  setContacts(newContacts: Contact[]) {
    const mapInitContacts: [string, Contact][] = newContacts.map((c) => {
      return [c.id, c];
    });

    this.contacts = new Map<string, Contact>(mapInitContacts);
  }
  /** ### Remove single contact from `contacts` collection. */
  removeContact(contactToRemove: Address) {
    this.contacts.delete(contactToRemove.value);
  }

  /** ### Add/update single address to `addresses` collection. */
  setAddress(addrToAddOrSet: Address) {
    this.addresses.set(addrToAddOrSet.value, addrToAddOrSet);
  }
  /** ### Set `addresses` state variable.
   * ### Option: replace/keep the original set. */
  setAddresses(addrsToAddOrSet: Address[], replace: boolean = false) {
    if (replace) {
      const mapInitAddresses: [string, Address][] = addrsToAddOrSet.map((a) => {
        return [a.value, a];
      });
      this.addresses = new Map<string, Address>(mapInitAddresses);
    } else {
      addrsToAddOrSet.forEach((a) => this.addresses.set(a.value, a));
    }
  }
  /** ### Remove single address from `addresses` collection. */
  removeAddress(addressToRemove: Address) {
    this.addresses.delete(addressToRemove.value);
  }
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /** @deprecated incomplete */
  signTxn(address: Address, txn: Transaction): SignedTransaction {
    return newSignedTransaction(address, txn);
  }
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
