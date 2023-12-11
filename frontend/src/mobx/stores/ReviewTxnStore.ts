import { Transaction } from "ethers";
// state
import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
// interfaces
import { Contact, StateStore } from "../interfaces";
import { StagedAddrToken } from "../../views/CreateTxn/interfaces";
// utils
import { fmtMktValue } from "../../utils/fmt";
import { buildAndSignTxn } from "../../views/CreateTxn/ReviewTxn/utils/transaction";
import {
  TestnetId,
  fetchTxnCost,
  getBlockchainInfo,
} from "../data/supportedBlockchains";
// data
import { connectionInfo } from "../data/connection";

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
  get totalFeesFmt(): string {
    return fmtMktValue(this.totalFees);
  }
  get feeRowItems() {
    // Get list of unique blockchains to be used in transaction
    const bcStore = new Map<TestnetId, { txnCt: number; fee: number }>();
    this.stagedTokens.forEach((token) => {
      const newTxnCt = bcStore.get(token.blockchainId)
        ? bcStore.get(token.blockchainId)!.txnCt + 1
        : 1;
      bcStore.set(token.blockchainId, { txnCt: newTxnCt, fee: token.fee });
    });

    let totalTxnFees = 0;

    // build data-grid row-items
    const rows: { blockchain: string; txnCost: number; txnCostFmt: string }[] =
      [];
    bcStore.forEach((bc, bcId) => {
      // Fee cost per txn
      totalTxnFees += bc.fee;

      rows.push({
        blockchain: getBlockchainInfo(bcId).symbol,
        txnCost: bc.fee * bc.txnCt,
        txnCostFmt: fmtMktValue(bc.fee * bc.txnCt),
      });
    });

    return rows;
  }
  get totalFees() {
    let sum = 0;
    this.feeRowItems.forEach((feeItem) => {
      sum += feeItem.txnCost;
    });
    return sum;
  }
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// ACTIONS ////////////////////////
  /** Stage tokens for sending
   * 1. Sort tokens by `balance / txn cost` in descending order;
   * 1.  Iter thru tokens from `enabled-tokens` state prop,  */
  async optimizeTokens() {
    // @todo move fee property to interface
    const enabledTokensWithFee: StagedAddrToken[] = [];

    await this.root.createTxn.enabledTokens.forEach(async (t) => {
      const enabledTokenWithFee: StagedAddrToken = {
        ...t,
        label: t.label,
        lookupId: t.lookupId,
        addrLookupId: t.addrLookupId,
        mktValue: t.mktValue,
        mktValueFmt: t.mktValueFmt,
        tokenInfo: t.tokenInfo,
        fee: await fetchTxnCost(t.blockchainId),
        sendAmt: 0,
      };
      enabledTokensWithFee.push(enabledTokenWithFee);
    });

    // Sort tokens by balance / txn cost
    enabledTokensWithFee.sort((a, b) => {
      const isAGtB = a.fee > b.fee;

      if (isAGtB) return 1;
      if (!isAGtB) return -1;
      return 0;
    });

    // Run optimization
    const targetAmt = this.root.createTxn.totalSendAmt;
    let remainingAmt = targetAmt;
    const stagedTokens: StagedAddrToken[] = [];

    for (let idx = 0; idx < enabledTokensWithFee.length; idx++) {
      const token = enabledTokensWithFee[idx];
      console.log(
        token.tokenInfo.label,
        token.spendLimit,
        remainingAmt,
        ` - fee ${token.fee} - `,
        token.spendLimit > remainingAmt + token.fee
      );
      // Check if this token's spend-limit is greater than the remaining send-amount
      if (token.spendLimit > remainingAmt + token.fee) {
        // If true, add the remaining send-amount
        token.sendAmt = remainingAmt;
        stagedTokens.push(token);
        break;
      } else {
        // Else, add the full spend-limit of the token
        token.sendAmt = token.spendLimit;
        stagedTokens.push(token);
      }
    }

    this.stagedTokens = stagedTokens;
  }
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  buildAndSignTxn = buildAndSignTxn;

  // @todo separate build and sign to give user preview of txn data before signature is added
  async buildAndSignTxns(
    stagedTokens: StagedAddrToken[]
  ): Promise<Transaction[]> {
    let amtRemaining = this.root.createTxn.totalSendAmt;

    const signedTxns: Transaction[] = [];
    for (let idx = 0; idx < stagedTokens.length; idx++) {
      const token = stagedTokens[idx];

      const sendAmtFromAddr = Math.min(token.mktValue, amtRemaining);

      if (sendAmtFromAddr <= 0) break;

      const txn = await this.buildAndSignTxn(
        connectionInfo[token.blockchainId as TestnetId].contract,
        sendAmtFromAddr,
        token,
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
