import { FC } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

// MUI
import { List } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsMenuOption from "./SettingsMenuOption";
import SecurityIcon from "@mui/icons-material/Security";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const SettingsMenu: FC = () => {
  return (
    <List
      container
      direction="column"
      flexWrap="nowrap"
      justifyContent="flex-start"
      overflow="auto"
      width="100%"
      maxWidth="100%"
      px={1}
      component={Grid}
    >
      <SettingsMenuOption icon={<SettingsIcon />} primary={"General"} />
      <SettingsMenuOption icon={<SecurityIcon />} primary={"Security"} />
      <SettingsMenuOption
        icon={<ManageAccountsIcon />}
        primary={"Manage accounts"}
      />
      <SettingsMenuOption icon={<DarkModeIcon />} primary={"Theme"} />
    </List>
  );
};

export default SettingsMenu;
