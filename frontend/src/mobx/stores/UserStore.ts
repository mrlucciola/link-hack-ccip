// state
import { makeAutoObservable } from "mobx";
// stores
import { RootStore } from ".";
// interfaces
import { Contact, StateStore } from "../interfaces";
import { UserAddress } from "../interfaces/address";
// @delete seed data
import { seedContactsMap, seedAddressesMap } from "../data/seed/seedUser";
import { HDNodeWallet } from "ethers";
import { UserWallet } from "../../views/Onboarding/interfaces";

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
  addresses: Map<string, UserAddress> = seedAddressesMap;
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
  removeContact(contactToRemove: UserAddress) {
    this.contacts.delete(contactToRemove.value);
  }

  /** ### Add/update single address to `addresses` collection. */
  setAddress(addrToAddOrSet: UserAddress) {
    this.addresses.set(addrToAddOrSet.value, addrToAddOrSet);
  }
  /** ### Set `addresses` state variable.
   * @param - if "true", replace the original set. */
  setAddresses(addrsToAddOrSet: UserAddress[], replace: boolean = false) {
    if (replace) {
      const mapInitAddresses: [string, UserAddress][] = addrsToAddOrSet.map(
        (a) => {
          return [a.value, a];
        }
      );
      this.addresses = new Map<string, UserAddress>(mapInitAddresses);
    } else {
      addrsToAddOrSet.forEach((a) => this.addresses.set(a.value, a));
    }
  }
  /** ### Remove single address from `addresses` collection. */
  removeAddress(addressToRemove: UserAddress) {
    this.addresses.delete(addressToRemove.value);
  }
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  getUserWallet(userAddress: string): HDNodeWallet {
    const wallets = new Map<string, UserWallet>();
    const walletAddressIdxMap = new Map<string, number>();
    const walletAddrIdx = walletAddressIdxMap.get(userAddress);

    if (!walletAddrIdx)
      throw new Error(`No wallet idx found for addr: ${userAddress}`);

    let foundWallet: HDNodeWallet | null = null;
    wallets.forEach((w) => {
      foundWallet = w.deriveChild(walletAddrIdx);
      return;
    });

    if (foundWallet === null)
      throw new Error(`No wallet found for addr: ${userAddress}`);

    return foundWallet;
  }
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
