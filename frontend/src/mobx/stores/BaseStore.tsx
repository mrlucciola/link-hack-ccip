// state
import { makeAutoObservable } from "mobx";
import { StateStore } from "../interfaces";
import { RootStore } from ".";
// style
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import HistoryIcon from "@mui/icons-material/History";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// interfaces
import { CreateTxnViewType } from "../../views/CreateTxn";

export const baseViewsMap = Object.freeze({
  home: { id: "home", label: "Home", icon: <HomeIcon /> },
  portfolio: {
    id: "portfolio",
    label: "Portfolio",
    icon: <AccountBalanceWalletIcon />,
  },
  createTxn: { id: "createTxn", label: "CreateTxn", icon: <AddCircleIcon /> },
  activity: { id: "activity", label: "Activity", icon: <HistoryIcon /> },
  contacts: { id: "contacts", label: "Contacts", icon: <ContactPageIcon /> },
});
export type BaseView = keyof typeof baseViewsMap;

/**  */
export const navUtilOptions = [
  "info",
  "options",
  "settings",
  "notifications",
] as const;
export type NavUtilOption = (typeof navUtilOptions)[number];
export interface INavUtil {
  id: NavUtilOption;
  action: () => void;
}

/** ## Base store
 */
export class BaseStore implements StateStore {
  // ctor
  constructor(public root: RootStore) {
    // init
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /////////////////////////////////////////////////////////
  ////////////////////// OBSERVABLES //////////////////////
  currentView: BaseView = "home"; // default: home
  navBack?: {
    // @note So far this prop seems somewhat unnecessary. Will likely remove soon.
    baseView: BaseView;
    // @note So far this prop seems somewhat unnecessary. Will likely remove soon.
    subView: CreateTxnViewType; // @todo add other subview union types
    /** Nav-related state updates to make when back button is clicked. */
    navTo: () => void;
  };
  navTitle: string = "";
  navUtils: INavUtil[] = [];
  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// ACTIONS ////////////////////////
  setCurrentView(newView: BaseView) {
    this.currentView = newView;
  }
  /** Configure the back-navigation button in the navbar. */
  setNavBack(newNavBack?: {
    baseView: BaseView;
    subView: CreateTxnViewType; // @todo add other subview union types
    navTo: () => void;
  }) {
    this.navBack = newNavBack;
  }
  /** Set the title in the navbar. */
  setNavTitle(newNavTitle: string) {
    this.navTitle = newNavTitle;
  }
  /** Pass in an empty array `[]` to unset the nav-util icon */
  setNavUtils(newNavUtil: INavUtil[]) {
    this.navUtils = newNavUtil;
  }

  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
