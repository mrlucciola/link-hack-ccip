// state
import { makeAutoObservable } from "mobx";
import { OnboardingViewType } from "../../views/Onboarding/interfaces";
import {
  UserWallet,
  newWalletFromMnemonic,
} from "../interfaces/wallet";

/** ## Onboarding store
 */
export class OnboardingStore {
  // ctor
  constructor() {
    // init
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /////////////////////////////////////////////////////////
  ////////////////////// OBSERVABLES //////////////////////
  currentView: OnboardingViewType = "walletSetup";
  wallets: UserWallet[] = [];
  currentWallet: UserWallet = {} as UserWallet;
  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// ACTIONS ////////////////////////
  setCurrentView(newView: OnboardingViewType) {
    this.currentView = newView;
  }
  addNewWallet(newWallet: UserWallet) {
    this.wallets.push(newWallet);
  }
  setCurrentWallet(newWallet: UserWallet) {
    this.currentWallet = newWallet;
  }
  setCurrentWalletAlias(alias: string) {
    this.currentWallet.alias = alias;
  }
  setWalletWithMnemonicByIdx(idx: number, newMnemonic: string) {
    const alias = this.wallets[idx].alias;
    // @todo add mnemonic validation handling
    const newWallet = newWalletFromMnemonic(newMnemonic, alias);
    this.wallets[idx] = newWallet;
  }
  setWalletAliasByIdx(idx: number, newAlias: string) {
    this.wallets[idx] = { ...this.wallets[idx], alias: newAlias } as UserWallet;
  }
  /** Set the text-field value - does not change anything about the rest of the wallet */
  setWalletMnemonicByIdx(idx: number, newMnemonic: string) {
    this.wallets[idx] = {
      ...this.wallets[idx],
      mnemonic: { phrase: newMnemonic },
    } as UserWallet;
  }
  removeWalletByIdx(walletIdx: number) {
    this.wallets = this.wallets.filter((_w, idx) => idx !== walletIdx);
  }
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
