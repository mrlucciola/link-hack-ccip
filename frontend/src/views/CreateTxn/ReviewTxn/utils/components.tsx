import { FC } from "react";
// style
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import { observer } from "mobx-react-lite";

export const CollapseSubheader: FC<{
  isOpen: boolean;
  setIsOpen: (input: boolean) => void;
  title: string;
}> = observer(({ isOpen, setIsOpen, title }) => {
  return (
    <ListSubheader sx={{ px: 0 }} component="div">
      <ListItemButton
        dense
        sx={{ py: 0, m: 0 }}
        selected={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ListItemSecondaryAction sx={{ display: "flex" }}>
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListSubheader>
  );
});

export const CollapseList: FC<{
  isOpen: boolean;
  children: React.ReactNode;
}> = observer(({ isOpen, children }) => {
  return (
    <Collapse in={isOpen} timeout={250} sx={{ flex: 1 }}>
      <List component="div" disablePadding>
        {children}
      </List>
    </Collapse>
  );
});
