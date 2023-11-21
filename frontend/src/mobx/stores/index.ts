// stores
import { MainStore } from "./MainStore";
// interfaces
import { GenericStore } from "../interfaces";
import { createUseStateHook } from "../provider/hooks";

/** ## Contains all of the application states.
 * Using the ["Combining Multiple Stores"](https://mobx.js.org/defining-data-stores.html#combining-multiple-stores) pattern.
 */
export class RootStore implements GenericStore {
  main: MainStore;

  constructor() {
    this.main = new MainStore(this);
  }
}

export type AppStoreKeys = keyof RootStore;
export type AppStoreTypes = RootStore[AppStoreKeys];

// Add store-specific hooks here
export const useMainStore = createUseStateHook("main");
