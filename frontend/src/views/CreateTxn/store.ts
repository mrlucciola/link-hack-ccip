// state
import { makeAutoObservable } from "mobx";
import { StateStore } from "../../mobx/interfaces";
import { RootStore } from "../../mobx/stores";
// interfaces
import { CreateTxnViewType } from ".";
import { AddrToken } from "../../mobx/interfaces/token";
import {
  EnabledAddr,
  EnabledAddrToken,
  Recipient,
  newEnabledAddr,
  newEnabledAddrToken,
} from "./interfaces";
// utils
import { mktValueFmt } from "../../utils/fmt";
import { BlockchainId } from "../../mobx/data/supportedBlockchains";

/** ## CreateTxn store
 */
export class CreateTxnStore implements StateStore {
  // ctor
  constructor(public root: RootStore) {
    // init
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /////////////////////////////////////////////////////////
  ////////////////////// OBSERVABLES //////////////////////
  currentView: CreateTxnViewType = "selectRecipient"; // default: selectRecipient
  recipient: Recipient = {} as Recipient;
  enabledTokens: Map<string, EnabledAddrToken> = new Map<
    string,
    EnabledAddrToken
  >();
  // @todo (separate ticket) select tokens and amounts, currently defaults to usdc
  totalSendAmt: number = 0;
  sendAddr: string = "";
  sendBlockchain: BlockchainId = "eth";
  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  get enabledAddrs(): Map<string, EnabledAddr> {
    const enabledAddrsMap = new Map<string, EnabledAddr>();

    this.enabledTokens.forEach((t) => {
      const addrLookup = `${t.blockchainId}-${t.addrId}`;
      const possibleEnabledAddr = enabledAddrsMap.get(addrLookup);

      // add the token to the address
      if (possibleEnabledAddr) {
        const updatedAddr: EnabledAddr = newEnabledAddr(
          possibleEnabledAddr.value,
          possibleEnabledAddr.blockchainId,
          { ...possibleEnabledAddr.tokens, [t.id]: t }
        );

        enabledAddrsMap.set(addrLookup, updatedAddr);
      } else {
        const updatedAddr: EnabledAddr = newEnabledAddr(
          t.addrId,
          t.blockchainId,
          { [t.id]: t }
        );
        enabledAddrsMap.set(addrLookup, updatedAddr);
      }
    });
    return enabledAddrsMap;
  }
  get enabledAddrsCt(): number {
    return this.enabledAddrs.size;
  }
  /** ### Spend limit for all user accounts
   *
   * - Accounts must be **enabled**
   * - Accounts must have a balance > 0
   */
  get totalSpendLimit(): number {
    let sum = 0;

    this.enabledAddrs.forEach((addr) => {
      if (addr.isEnabled) sum += addr.totalMktValue;
    });

    return sum;
  }
  get totalSpendLimitFmt(): string {
    return mktValueFmt(this.totalSpendLimit);
  }

  get totalSendAmtFmt(): string {
    return mktValueFmt(this.totalSendAmt);
  }
  get isSpendLimitGtSendAmt(): boolean {
    return this.totalSpendLimit > this.totalSendAmt;
  }
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// ACTIONS ////////////////////////
  setCurrentView(newView: CreateTxnViewType) {
    this.currentView = newView;
  }
  setRecipient(newRecipient: Recipient) {
    this.recipient = newRecipient;
  }
  setEnabledAddrTokenStatus(tokenToEnable: AddrToken, isEnabled: boolean) {
    const enabledToken = this.enabledTokens.get(tokenToEnable.lookupId);

    if (enabledToken) {
      const updatedToken = newEnabledAddrToken(
        enabledToken.id,
        enabledToken.blockchainId,
        enabledToken.addrId,
        enabledToken.spendLimit,
        isEnabled
      );
      this.enabledTokens.set(enabledToken.lookupId, updatedToken);
    } else {
      this.enabledTokens.set(
        tokenToEnable.lookupId,
        newEnabledAddrToken(
          tokenToEnable.id,
          tokenToEnable.blockchainId,
          tokenToEnable.addrId,
          tokenToEnable.amount,
          isEnabled
        )
      );
    }
  }
  setEnabledAddrTokenSpendLimit(token: AddrToken, newSpendLimitInput: string) {
    // @todo add validation for spend limit
    const validatedSpendLimit = Number(newSpendLimitInput) || 0;

    const enabledToken = this.enabledTokens.get(token.lookupId);
    if (enabledToken) {
      const updatedToken = newEnabledAddrToken(
        enabledToken.id,
        enabledToken.blockchainId,
        enabledToken.addrId,
        validatedSpendLimit,
        enabledToken.isEnabled
      );
      this.enabledTokens.set(token.lookupId, updatedToken);
    }
  }
  setSendAmt(sendAmtInput: string) {
    // @todo add validation
    const validatedSendAmt = Number(sendAmtInput) || 0;

    this.totalSendAmt = validatedSendAmt;
  }
  setSendAddr(newSendAddr: string) {
    this.sendAddr = newSendAddr;
  }
  setSendBlockchain(newSendBlockchain: BlockchainId) {
    this.sendBlockchain = newSendBlockchain;
  }
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
