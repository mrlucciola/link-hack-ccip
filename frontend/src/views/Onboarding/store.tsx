import { FC, ReactNode } from "react";
// state
import { makeAutoObservable } from "mobx";
import { useLocalObservable } from "mobx-react-lite";
import { createStoreCtx } from "../../mobx/provider/context";
import { useStoreData } from "../../mobx/provider/hooks";

export type OnboardingViewType = "keySetup" | "splash" | "welcome" | "complete";

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
