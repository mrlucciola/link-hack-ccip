import { FC } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BodyLayout from "../../layouts/BodyLayout";

// MUI
import { List } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsMenuOption from "./SettingsMenuOption";
import SecurityIcon from "@mui/icons-material/Security";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const SettingsMenu: FC = () => {
  return (
    <BodyLayout>
      <List>
        <SettingsMenuOption icon={<SettingsIcon />} primary={"General"} />
        <SettingsMenuOption icon={<SecurityIcon />} primary={"Security"} />
        <SettingsMenuOption
          icon={<ManageAccountsIcon />}
          primary={"Manage accounts"}
        />
        <SettingsMenuOption icon={<DarkModeIcon />} primary={"Theme"} />
      </List>
    </BodyLayout>
  );
};

export default SettingsMenu;
