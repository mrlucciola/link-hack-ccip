import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
// style
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// components

const FeesForm: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const testElems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
    <ListItem sx={{ py: 0, pr: 1, pt: 0.5 }} component={"div"}>
      <Collapse
        in={isOpen}
        timeout={{ enter: 250, exit: 250 }}
        sx={{ flex: 1 }}
      >
        <List component="div" disablePadding>
          {/* {tokenElems} */}
          {`hi: ${item}`}
        </List>
      </Collapse>
    </ListItem>
  ));

  return (
    <li key={`fees-dropdown`}>
      <ListSubheader sx={{ px: 0 }}>
        <ListItemButton
          dense
          sx={{ py: 0, m: 0 }}
          selected={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          Fees
        </ListItemButton>
      </ListSubheader>
      <Collapse in={isOpen} timeout={250} sx={{ flex: 1 }}>
        <List component="div" disablePadding>
          {testElems}
        </List>
      </Collapse>
    </li>
  );
};

export default observer(FeesForm);
