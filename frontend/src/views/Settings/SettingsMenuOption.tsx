import { FC, ReactElement } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

interface SettingsMenuOptionProps {
  primary: string;
  icon: ReactElement;
}

const SettingsMenuOption: FC<SettingsMenuOptionProps> = ({
  primary,
  icon,
  ...props
}) => {
  const handleClick = () => {};
  return (
    <ListItem disablePadding {...props}>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItemButton>
    </ListItem>
  );
};

export default SettingsMenuOption;
