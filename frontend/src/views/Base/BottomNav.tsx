import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useBaseStore } from "../../mobx/stores";
// style
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// data
import { BaseView, baseViewsMap } from "./store";

/** Bottom navigation panel
 * Contains items for switching sub-views within the `base` view:
 *
 * 1. Portfolio
 * 1. Activity/History
 * 1. Create transaction
 * 1. Accounts
 * 1. Contacts
 */
const BottomNav: FC = () => {
  const setCurrentView = useBaseStore((s) => s.setCurrentView);
  const currentView = useBaseStore((s) => s.currentView);

  // event handler - switch view
  const handleChange = (_e: React.SyntheticEvent, newValue: BaseView) => {
    // setValue(newValue);
    setCurrentView(newValue);
  };
  // build
  const navElems = Object.values(baseViewsMap).map((v) => (
    <BottomNavigationAction
      sx={{ minWidth: "inherit", maxWidth: "inherit" }}
      value={v.id}
      label={v.label}
      icon={v.icon}
      key={`${v.id}-${v.label}`}
    />
  ));

  return (
    <BottomNavigation
      sx={{ height: 50, minHeight: 50, maxHeight: 50 }}
      value={currentView}
      onChange={handleChange}
      component={Grid}
    >
      {navElems}
    </BottomNavigation>
  );
};

export default observer(BottomNav);
