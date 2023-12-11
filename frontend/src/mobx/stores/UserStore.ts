import { HDNodeWallet } from "ethers";
// state
import { makeAutoObservable } from "mobx";
// stores
import { RootStore } from ".";
// interfaces
import { Contact, StateStore } from "../interfaces";
import {
  AddressLookupId,
  BaseUserAddress,
  UserAddress,
  newAddress,
} from "../interfaces/address";
import { UserWallet, WalletLookupId } from "../../mobx/interfaces/wallet";
import { BaseAddrToken } from "../interfaces/token";
// @delete seed data
import { seedContactsMap } from "../data/seed/seedUser";
import { fmtMktValue } from "../../utils/fmt";

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
  rootWallets: Map<WalletLookupId, UserWallet> = new Map<
    WalletLookupId,
    UserWallet
  >();
  addresses: Map<AddressLookupId, UserAddress> = new Map<
    AddressLookupId,
    UserAddress
  >();
  // @todo remove the seed data when done testing
  // @todo add ContactLookupId
  contacts: Map<string, Contact> = seedContactsMap;
  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  get portfolioMktValue(): number {
    let sum = 0;
    this.addresses.forEach((a) => (sum += a.totalMktValue));

    return sum;
  }
  get portfolioMktValueFmt(): string {
    return fmtMktValue(this.portfolioMktValue);
  }
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

  /** ### Add single address to `addresses` collection using root wallet. */
  addNewAddress(rootWallet: UserWallet) {
    const newAddrWallet = rootWallet.deriveChild(
      rootWallet.derivedKeyIdxs.length
    );
    const newAddr = newAddress(
      newAddrWallet.address,
      "ethSepolia",
      newAddrWallet,
      rootWallet.lookupId,
      ""
    );
    this.addresses.set(newAddr.lookupId, newAddr);
  }
  /** ### Add/update single address to `addresses` collection. */
  setAddress(addrToAddOrSet: UserAddress) {
    this.addresses.set(addrToAddOrSet.lookupId, addrToAddOrSet);
  }
  /** ### Set `addresses` state variable.
   * @param - if "true", replace the original set. */
  setAddresses(addrsToAddOrSet: UserAddress[], replace: boolean = false) {
    if (replace) {
      this.addresses = new Map<AddressLookupId, UserAddress>(
        addrsToAddOrSet.map((a) => [a.lookupId, a])
      );
    } else {
      addrsToAddOrSet.forEach((a) => this.addresses.set(a.lookupId, a));
    }
  }
  /** ### Remove single address from `addresses` collection. */
  removeAddress(addressToRemove: UserAddress) {
    this.addresses.delete(addressToRemove.lookupId);
  }
  /** ### Set `rootWallets` state variable.
   * @param - if "true", replace the original set. */
  setRootWallets(walletsToAddOrSet: UserWallet[], replace: boolean = false) {
    if (replace) {
      this.rootWallets = new Map<WalletLookupId, UserWallet>(
        walletsToAddOrSet.map((w) => [w.lookupId, w])
      );
    } else {
      walletsToAddOrSet.forEach((w) => this.rootWallets.set(w.lookupId, w));
    }
  }
  setWalletAlias(walletLookupId: WalletLookupId, newAlias: string) {
    const wallet = this.rootWallets.get(walletLookupId);

    if (!wallet) throw new Error(`No wallet for lookupId: ${walletLookupId}`);

    wallet.alias = newAlias;

    this.rootWallets.set(walletLookupId, wallet);
  }
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /** Get a `UserAddress` instance from an `AddrToken` instance:
   * 1. The address string;
   * 1. An instance of the Token type;
   */
  getUserAddress(
    addrLookupOrToken: AddressLookupId | BaseAddrToken
  ): UserAddress {
    // Handle input type
    const lookup =
      addrLookupOrToken instanceof BaseAddrToken
        ? addrLookupOrToken.addrLookupId
        : addrLookupOrToken;

    const userAddr = this.addresses.get(lookup);

    if (!userAddr) throw new Error(`No user-address found for: ${lookup}`);

    return userAddr;
  }
  /** Get user wallet for an address, using:
   * 1. The address string;
   * 1. An instance of the BaseUserAddress type;
   * 1. An instance of the UserToken type;
   */
  getAddrWallet(
    inputWithAddrLookupId: AddressLookupId | BaseAddrToken
  ): HDNodeWallet {
    let addrLookupId: AddressLookupId;
    if (inputWithAddrLookupId instanceof BaseAddrToken) {
      addrLookupId = inputWithAddrLookupId.addrLookupId;
    } else addrLookupId = inputWithAddrLookupId;

    const addr = this.addresses.get(addrLookupId);

    if (!addr)
      throw new Error(
        `No address found for lookupId: ${inputWithAddrLookupId}`
      );
    if (!addr.wallet)
      throw new Error(`No wallet found for lookupId: ${inputWithAddrLookupId}`);

    return addr.wallet;
  }
  getRootWallet(
    inputWithRootWalletLookupId: WalletLookupId | UserAddress
  ): UserWallet {
    let rootWalletLookupId: WalletLookupId;
    if (inputWithRootWalletLookupId instanceof BaseUserAddress) {
      rootWalletLookupId = inputWithRootWalletLookupId.rootWalletLookupId;
    } else rootWalletLookupId = inputWithRootWalletLookupId;

    const rootWallet = this.rootWallets.get(rootWalletLookupId);

    if (!rootWallet) {
      // console.log(JSON.stringify(inputWithRootWalletLookupId));
      throw new Error(
        `No wallet found for lookupId: ${inputWithRootWalletLookupId}`
      );
    }

    return rootWallet;
  }
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
