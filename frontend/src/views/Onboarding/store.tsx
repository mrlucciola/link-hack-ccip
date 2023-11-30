import { FC, ReactNode } from "react";
import { HDNodeWallet, Wallet } from "ethers";
// state
import { makeAutoObservable } from "mobx";
import { useLocalObservable } from "mobx-react-lite";
import { createStoreCtx } from "../../mobx/provider/context";
import { useStoreData } from "../../mobx/provider/hooks";

export type OnboardingViewType = "keySetup" | "splash" | "welcome" | "complete";

export class UserWallet extends HDNodeWallet {
  alias: string = "";
}
export const newUserWallet = () => {
  const newWallet = Wallet.createRandom() as UserWallet;
  newWallet.alias = "";

  return newWallet;
};

/** Onboarding store
 */
export class OnboardingStore {
  // ctor
  constructor() {
    // init
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /////////////////////////////////////////////////////////
  ////////////////////// OBSERVABLES //////////////////////
  currentView: OnboardingViewType = "keySetup";
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
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}

const onboardingStoreCtx = createStoreCtx<OnboardingStore>();

export const OnboardingStoreProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const store = useLocalObservable(() => new OnboardingStore());

  return (
    <onboardingStoreCtx.Provider value={store}>
      {children}
    </onboardingStoreCtx.Provider>
  );
};

export const useOnboardingState = <Selection,>(
  dataSelector: (store: OnboardingStore) => Selection
) =>
  useStoreData(onboardingStoreCtx, (contextData) => contextData!, dataSelector);
