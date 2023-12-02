// state
import { makeAutoObservable } from "mobx";
import { Address, StateStore } from "../../mobx/interfaces";
import { RootStore } from "../../mobx/stores";
// interfaces
import { CreateTxnViewType } from ".";
import { EnabledAddr, Recipient, newEnabledAddr } from "./interfaces";
import { mktValueFmt } from "../../utils/fmt";

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
  enabledAddrs: Map<string, EnabledAddr> = new Map<string, EnabledAddr>();
  // @todo (separate ticket) select tokens and amounts, currently defaults to usdc
  totalSendAmt: number = 0;
  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  get enabledAddrsCt(): number {
    return this.enabledAddrs.size;
  }
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
  // @todo (separate ticket) select tokens and amounts, currently defaults to usdc
  // get totalSendAmt(): number {
  //   let sum = 0;
  //   this.enabledAddrs.forEach((addr) => {
  //     if (addr.isEnabled) sum += addr.spendLimit;
  //   });

  //   return sum;
  // }
  get totalSendAmtFmt(): string {
    return mktValueFmt(this.totalSpendLimit);
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
  setAddrStatus(addrToEnable: Address, isEnabled: boolean) {
    const addr = this.enabledAddrs.get(addrToEnable.value);

    if (addr) {
      this.enabledAddrs.set(addrToEnable.value, { ...addr, isEnabled });
    } else {
      this.enabledAddrs.set(
        addrToEnable.value,
        // @todo allow user to control limit
        // newEnabledAddr(addrToEnable.value, 0, isEnabled)
        newEnabledAddr(
          addrToEnable.value,
          addrToEnable.totalMktValue,
          isEnabled
        )
      );
    }
  }
  // unused
  setAddrSpendLimit(addrToAdjust: Address, newSpendLimit: number) {
    const addr = this.enabledAddrs.get(addrToAdjust.value);

    if (addr) {
      this.enabledAddrs.set(addrToAdjust.value, {
        ...addr,
        spendLimit: newSpendLimit,
      });
    }
  }
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
