// state
import { makeAutoObservable } from "mobx";
import { RootStore } from "../../../mobx/stores";
// interfaces
import { Contact, StateStore } from "../../../mobx/interfaces";
import { mktValueFmt } from "../../../utils/fmt";
import { buildAndSignTxn } from "./utils/transaction";
import { TestnetId } from "../../../mobx/data/supportedBlockchains";
import { Transaction } from "ethers";
import { connectionInfo } from "../../../mobx/data/connection";
import { EnabledAddr } from "../interfaces";
// utils

/** ## ReviewTxn store
 */
export class ReviewTxnStore implements StateStore {
  constructor(public root: RootStore) {
    // init
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /////////////////////////////////////////////////////////
  ////////////////////// OBSERVABLES //////////////////////
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
    return mktValueFmt(this.totalFees);
  }
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// ACTIONS ////////////////////////
  setTotalFees(newAmt: number) {
    this.totalFees = newAmt;
  }
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  buildAndSignTxn = buildAndSignTxn;

  async buildAndSignTxns(
    optimizedAddrs: EnabledAddr[]
  ): Promise<Transaction[]> {
    let amtRemaining = this.root.createTxn.totalSendAmt;

    const signedTxns: Transaction[] = [];
    for (let idx = 0; idx < optimizedAddrs.length; idx++) {
      const addr = optimizedAddrs[idx];

      const sendAmtFromAddr = Math.min(addr.totalMktValue, amtRemaining);

      if (sendAmtFromAddr <= 0) break;

      const txn = await this.buildAndSignTxn(
        connectionInfo[addr.blockchainId as TestnetId].contract,
        sendAmtFromAddr,
        addr,
        {
          value: this.root.createTxn.sendAddr,
          blockchainId: this.root.createTxn.sendBlockchain as TestnetId,
        }
      );

      signedTxns.push(txn);

      amtRemaining -= sendAmtFromAddr;
    }

    return signedTxns;
  }
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
