// state
import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
// interfaces
import { Contact, StateStore } from "../interfaces";
import { StagedAddrToken } from "../../views/CreateTxn/interfaces";
// utils
import { fmtMktValue } from "../../utils/fmt";

/** ## ReviewTxn store
 */
export class ReviewTxnStore implements StateStore {
  constructor(public root: RootStore) {
    // init
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /////////////////////////////////////////////////////////
  ////////////////////// OBSERVABLES //////////////////////
  /** Shortlist of tokens to send.
   * A calculation is performed after enabling tokens (within the UI) to generate this list.
   * This is used to calculate fees.*/
  stagedTokens: StagedAddrToken[] = [];
  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  get contact(): Contact {
    const recipientAddr = this.root.createTxn.sendAddr;
    const recipientBlockchain = this.root.createTxn.sendBlockchain;

    let returnContact = new Contact("", "New address", []);
    this.root.user.contacts.forEach((c) => {
      c.addresses.forEach((a) => {
        if (a.value === recipientAddr && a.blockchainId === recipientBlockchain)
          returnContact = c;
      });
    });

    return returnContact;
  }
  // @note should be a getter
  totalFees: number = 292;
  get totalFeesFmt(): string {
    return fmtMktValue(this.totalFees);
  }
  feeRowItems: { blockchain: string; txnCost: string }[] = [];
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// ACTIONS ////////////////////////
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
