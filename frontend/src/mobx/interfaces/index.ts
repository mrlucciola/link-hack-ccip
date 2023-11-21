import { RootStore } from "../stores";

export interface GenericStore {}

export interface StateStore extends GenericStore {
  root: RootStore;
}
