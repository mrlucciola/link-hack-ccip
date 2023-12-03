// state
import { makeAutoObservable } from "mobx";
import { StateStore } from "../../mobx/interfaces";
import { AddrToken, Address } from "../../mobx/interfaces/address";
import { RootStore } from "../../mobx/stores";
// interfaces
import { CreateTxnViewType } from ".";
import {
  EnabledAddr,
  EnabledAddrToken,
  Recipient,
  newEnabledAddr,
  newEnabledAddrToken,
} from "./interfaces";
import { mktValueFmt } from "../../utils/fmt";
import { TokenId, lookupTokenMktValue } from "../../mobx/data/tokens";
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
  currentView: CreateTxnViewType = "selectSrc"; // default: selectRecipient
  recipient: Recipient = {} as Recipient;
  enabledTokens: Map<string, EnabledAddrToken> = new Map<
    string,
    EnabledAddrToken
  >();
  // @todo (separate ticket) select tokens and amounts, currently defaults to usdc
  totalSendAmt: number = 0;
  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  get enabledAddrs(): Map<string, EnabledAddr> {
    const enabledAddrsMap = new Map<string, EnabledAddr>();

    this.enabledTokens.forEach((t, lookup) => {
      const tokenId: TokenId = lookup.split("-")[0] as TokenId;
      const blockchainId: BlockchainId = lookup.split("-")[1] as BlockchainId;
      const addrValue = lookup.split("-")[2];
      const addrLookup = `${blockchainId}-${addrValue}`;

      const possibleEnabledAddr = enabledAddrsMap.get(addrLookup);
      if (possibleEnabledAddr) {
        const updatedAddr: EnabledAddr = newEnabledAddr(
          possibleEnabledAddr.value,
          possibleEnabledAddr.blockchainId,
          possibleEnabledAddr.spendLimit +
            (t.isEnabled ? lookupTokenMktValue(tokenId) * t.spendLimit : 0)
        );
        enabledAddrsMap.set(addrLookup, updatedAddr);
      } else {
        const updatedAddr: EnabledAddr = newEnabledAddr(
          addrValue,
          blockchainId,
          t.isEnabled ? lookupTokenMktValue(tokenId) * t.spendLimit : 0
        );
        enabledAddrsMap.set(addrLookup, updatedAddr);
      }
    });
    return enabledAddrsMap;
  }
  get enabledAddrsCt(): number {
    return this.enabledAddrs.size;
  }
  // @todo fix according to tokens
  get totalSpendLimit(): number {
    let sum = 0;
    this.enabledAddrs.forEach((addr) => {
      if (addr.isEnabled) sum += addr.spendLimit;
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
  setEnabledAddrTokenStatus(
    addrWithToken: Address,
    tokenToEnable: AddrToken,
    isEnabled: boolean
  ) {
    const enabledTokenId = this.getEnabledTokenId(
      tokenToEnable.id,
      addrWithToken
    );
    const enabledToken = this.enabledTokens.get(enabledTokenId);

    if (enabledToken) {
      this.enabledTokens.set(enabledTokenId, { ...enabledToken, isEnabled });
    } else {
      this.enabledTokens.set(
        enabledTokenId,
        newEnabledAddrToken(tokenToEnable.amount, isEnabled)
      );
    }
  }
  setEnabledAddrTokenSpendLimit(
    addrToAdjust: Address,
    tokenId: TokenId,
    newSpendLimitInput: string
  ) {
    const enabledTokenId = this.getEnabledTokenId(tokenId, addrToAdjust);
    // @todo add validation for spend limit
    const validatedSpendLimit = Number(newSpendLimitInput) || 0;

    const token = this.enabledTokens.get(enabledTokenId);
    if (token) {
      this.enabledTokens.set(enabledTokenId, {
        ...token,
        spendLimit: validatedSpendLimit,
      });
    }
  }
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  getEnabledAddrToken(
    addr: Address,
    tokenId: TokenId
  ): EnabledAddrToken | undefined {
    return this.enabledTokens.get(this.getEnabledTokenId(tokenId, addr));
  }
  getEnabledTokenId(tokenId: TokenId, addr: Address): string {
    return `${tokenId}-${addr.blockchainId}-${addr.value}`;
  }
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
