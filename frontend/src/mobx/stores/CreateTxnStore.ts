// state
import { makeAutoObservable } from "mobx";
import { StateStore } from "../interfaces";
import { RootStore } from ".";
// interfaces
import { CreateTxnViewType } from "../../views/CreateTxn";
import { AddrToken, TokenLookupId } from "../interfaces/token";
import {
  EnabledAddr,
  EnabledAddrToken,
  Recipient,
  newEnabledAddr,
  newEnabledAddrToken,
} from "../../views/CreateTxn/interfaces";
import { TestnetId } from "../data/supportedBlockchains";
// utils
import { fmtMktValue } from "../../utils/fmt";
import { AddressLookupId } from "../interfaces/address";

/** ## CreateTxn store
 */
export class CreateTxnStore implements StateStore {
  constructor(public root: RootStore) {
    // init
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /////////////////////////////////////////////////////////
  ////////////////////// OBSERVABLES //////////////////////
  currentView: CreateTxnViewType = "selectRecipient";
  recipient: Recipient = {} as Recipient;
  enabledTokens: Map<TokenLookupId, EnabledAddrToken> = new Map<
    TokenLookupId,
    EnabledAddrToken
  >();
  // @todo (separate ticket) select tokens and amounts, currently defaults to usdc
  totalSendAmt: number = 0; // 800
  // @delete - testing
  sendAddr: string = ""; // 0x4Ee318c930C1284D2379965D45015Ff17B96950A
  // sendAddr: string = "";
  sendBlockchain: TestnetId = "maticMumbai";
  /** Local state variable that involved a lot of prop drilling. */
  isContactsOpen: boolean = false;
  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  /** @deprecated not configured */
  get areAllFormsValid(): boolean {
    // @delete - testing
    return true; // default: false
  }
  /** Collection of addresses similar to that in user state.
   * Generated from list of tokens selected (enabled) via the UI.*/
  get enabledAddrs(): Map<AddressLookupId, EnabledAddr> {
    const enabledAddrsMap = new Map<AddressLookupId, EnabledAddr>();

    this.enabledTokens.forEach((t) => {
      const existingAddr = enabledAddrsMap.get(t.addrLookupId);

      // add the token to the address
      if (existingAddr) {
        const updatedAddr: EnabledAddr = newEnabledAddr(
          existingAddr.value,
          existingAddr.blockchainId,
          existingAddr.wallet,
          existingAddr.rootWalletLookupId,
          { ...existingAddr.tokens, [t.id]: t }
        );

        enabledAddrsMap.set(t.addrLookupId, updatedAddr);
      } else {
        const userAddr = this.root.user.getUserAddress(t);

        const updatedAddr: EnabledAddr = newEnabledAddr(
          t.addrId,
          t.blockchainId,
          userAddr.wallet,
          userAddr.rootWalletLookupId,
          { [t.id]: t }
        );
        enabledAddrsMap.set(t.addrLookupId, updatedAddr);
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
    return fmtMktValue(this.totalSpendLimit);
  }
  get totalSendAmtFmt(): string {
    return fmtMktValue(this.totalSendAmt);
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
  setSendBlockchain(newSendBlockchain: TestnetId) {
    this.sendBlockchain = newSendBlockchain;
  }
  setIsContactsOpen(isOpen: boolean) {
    this.isContactsOpen = isOpen;
  }
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
