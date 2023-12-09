import { Transaction } from "ethers";
// state
import { makeAutoObservable } from "mobx";
import { RootStore } from "../../../mobx/stores";
// interfaces
import { Contact, StateStore } from "../../../mobx/interfaces";
import { EnabledAddr } from "../interfaces";
// utils
import { fmtMktValue } from "../../../utils/fmt";
import { buildAndSignTxn } from "./utils/transaction";
import {
  TestnetId,
  fetchTxnCost,
} from "../../../mobx/data/supportedBlockchains";
// data
import { connectionInfo } from "../../../mobx/data/connection";
// seed
import { sendAddrs } from "./SendAddrsOverview";

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
    return fmtMktValue(this.totalFees);
  }
  feeRowItems: { blockchain: string; txnCost: string }[] = [];
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// ACTIONS ////////////////////////
  /** @deprecated mock fxn with mock data */
  async buildFeeRowItems() {
    const enabledAddrs = sendAddrs; // @todo replace with: this.root.createTxn.enabledAddrs

    const bcStore = new Map<TestnetId, number>();
    enabledAddrs.forEach((a) => {
      const newTxnCt = bcStore.get(a.blockchainId)
        ? bcStore.get(a.blockchainId)! + 1
        : 1;
      bcStore.set(a.blockchainId, newTxnCt);
    });

    let totalTxnCost = 0;

    // build data-grid row-items
    const rows: { blockchain: string; txnCost: string }[] = [];
    for (const item of bcStore.entries()) {
      // Fee cost per txn
      const txnCost = await fetchTxnCost(item[0]);
      totalTxnCost += txnCost;
      rows.push({
        blockchain: item[0].toLocaleUpperCase(),
        txnCost: fmtMktValue(txnCost * item[1]),
      });
    }

    this.feeRowItems = rows;
    this.totalFees = totalTxnCost;
  }
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  buildAndSignTxn = buildAndSignTxn;

  // @todo separate build and sign to give user preview of txn data before signature is added
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
