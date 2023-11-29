// interfaces
import { GenericStore } from "../interfaces";
import { createUseStateHook } from "../provider/hooks";
// stores
import { MainStore } from "./MainStore";
import { ViewStore } from "./ViewStore";

/** ## Contains all of the application states.
 * Using the ["Combining Multiple Stores"](https://mobx.js.org/defining-data-stores.html#combining-multiple-stores) pattern.
 */
export class RootStore implements GenericStore {
  main: MainStore;
  view: ViewStore;

  constructor() {
    this.main = new MainStore(this);
    this.view = new ViewStore(this);
  }
}

// Add store-specific hooks here
export const useMainStore = createUseStateHook("main");
export const useViewStore = createUseStateHook("view");
