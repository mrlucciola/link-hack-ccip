// state
import { makeAutoObservable } from "mobx";
import { StateStore } from "../../mobx/interfaces";
import { RootStore } from "../../mobx/stores";
// style
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import HistoryIcon from "@mui/icons-material/History";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// interfaces
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
  currentView: BaseView = "createTxn";
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
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
