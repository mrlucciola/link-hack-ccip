// interfaces
import { GenericStore } from "../interfaces";
import { createUseStateHook } from "../provider/hooks";
// stores
import { MainStore } from "./MainStore";
import { ViewStore } from "./ViewStore";
import { OnboardingStore } from "../../views/Onboarding/store";

/** ## Contains all of the application states.
 * Using the ["Combining Multiple Stores"](https://mobx.js.org/defining-data-stores.html#combining-multiple-stores) pattern.
 */
export class RootStore implements GenericStore {
  main: MainStore;
  view: ViewStore;
  onboarding: OnboardingStore;

  constructor() {
    this.main = new MainStore(this);
    this.view = new ViewStore(this);
    this.onboarding = new OnboardingStore();
  }
}

// Add store-specific hooks here
export const useMainStore = createUseStateHook("main");
export const useViewStore = createUseStateHook("view");
export const useOnboardingStore = createUseStateHook("onboarding");
