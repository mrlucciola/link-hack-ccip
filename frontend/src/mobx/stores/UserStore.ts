// state
import { makeAutoObservable } from "mobx";
// stores
import { RootStore } from ".";
import { Address, Contact, StateStore } from "../interfaces";
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
  setAddress(newAddress: Address) {
    this.addresses.set(newAddress.value, newAddress);
  }
  /** ### Set `addresses` state variable.
   * ### Option: replace/keep the original set. */
  setAddresses(newAddresses: Address[], replace: boolean = false) {
    if (replace) {
      const mapInitAddresses: [string, Address][] = newAddresses.map((a) => {
        return [a.value, a];
      });
      this.addresses = new Map<string, Address>(mapInitAddresses);
    } else {
      newAddresses.forEach((a) => this.addresses.set(a.value, a));
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
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
