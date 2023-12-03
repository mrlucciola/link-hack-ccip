import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
// style
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
// components
import SpendLimit from "./SpendLimit";
// interfaces
import { AddrToken, Address } from "../../../../mobx/interfaces/address";

const AddrTokenElem: FC<{
  addr: Address;
  token: AddrToken;
}> = observer(({ addr, token }) => {
  return (
    <ListItem divider dense>
      <ListItemAvatar>
        <Avatar sx={{ fontSize: "0.7em", fontWeight: 900 }}>
          {token.label}
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primaryTypographyProps={{ fontWeight: 600 }}
        primary={token.amount}
        secondary={token.mktValueFmt}
      />

      <SpendLimit addr={addr} token={token} />
    </ListItem>
  );
});

/**
 * @todo sticky title
 */
const AddrDetailCollapse: FC<{
  addr: Address;
  isOpen: boolean;
}> = ({ addr, isOpen }) => {
  const tokens = addr.tokens;

  // build
  const tokenElems: JSX.Element[] = tokens.map((t) => (
    <AddrTokenElem addr={addr} token={t} key={t.lookupId} />
  ));

  return (
    <ListItem sx={{ py: 0, pr: 1, pt: 0.5 }} component={"div"}>
      <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ flex: 1 }}>
        <List component="div" disablePadding>
          {tokenElems}
        </List>
      </Collapse>
    </ListItem>
  );
};

export default observer(AddrDetailCollapse);
