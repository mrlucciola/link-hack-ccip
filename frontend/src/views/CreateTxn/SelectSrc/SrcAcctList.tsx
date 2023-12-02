import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
// import { useUserStore } from "../../../mobx/stores";
// style
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
// components
// interfaces
import { Address, newAddress } from "../../../mobx/interfaces";
import { fmtCenterEllipsis } from "../../../layouts/Text";
import {
  Checkbox,
  Chip,
  ListItemSecondaryAction,
  ListSubheader,
} from "@mui/material";

const SrcAcct: FC<{ addr: Address }> = ({ addr }) => {
  const [isSelected, setIsSelected] = useState(false);

  // event handlers
  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);
  };
  // format values
  const addrFmt = (
    <>
      {fmtCenterEllipsis(addr.value)}
      {addr.blockchainInfo.img?.sm ? (
        <Avatar src={addr.blockchainInfo.img?.sm} />
      ) : (
        <Chip
          label={addr.blockchainInfo.id.toLocaleUpperCase()}
          size="small"
          sx={{ mt: -0.4, mx: 1 }}
        />
      )}
    </>
  );
  // const addrHover = addr.value;

  return (
    <ListItemButton component={Paper} selected={isSelected}>
      {/* <ListItemIcon></ListItemIcon> */}
      <ListItemText
        primary={addr.label || addrFmt}
        secondary={addr.label ? addrFmt : undefined}
      />
      <ListItemSecondaryAction>
        <Checkbox onChange={onCheck} />
      </ListItemSecondaryAction>
    </ListItemButton>
  );
};

/** ### List of accounts at the `source`/sender side of the transaction
 */
const SrcAcctList: FC = () => {
  // @todo add addresses to state
  // const addrs = useUserStore(s=>s.addresses)
  const addrs: Address[] = [
    newAddress("0xic939d0x98f02123", "matic", ""),
    newAddress("0xabczoj29d8f02456", "eth", "Treasury"),
    newAddress("0xXyzzoj29d8f02098", "op", "Personal"),
  ];
  // build
  const srcAcctElems = addrs.map((a) => <SrcAcct addr={a} key={a.value} />);

  return (
    <List
      container
      direction="column"
      flexWrap="nowrap"
      justifyContent="flex-start"
      overflow="scroll"
      width="100%"
      maxWidth="100%"
      px={1}
      component={Grid}
      subheader={<ListSubheader component="div">Select Accounts</ListSubheader>}
    >
      {srcAcctElems}
    </List>
  );
};

export default observer(SrcAcctList);
