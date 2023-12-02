import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../../mobx/stores";
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
  Typography,
} from "@mui/material";

const SrcAddr: FC<{ addr: Address }> = observer(({ addr }) => {
  const [isSelected, setIsSelected] = useState(false);
  const setAddrStatus = useCreateTxnStore((s) => s.setAddrStatus);

  // event handlers
  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddrStatus(addr, e.target.checked);
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
          component="span"
        />
      )}
    </>
  );
  // const addrHover = addr.value;
  const primaryText = addr.label || addrFmt;
  const secondaryText = addr.label ? addrFmt : undefined;

  return (
    <ListItemButton component={Paper} selected={isSelected} dense>
      <ListItemText
        primary={primaryText}
        secondary={
          <>
            {secondaryText}
            {secondaryText && <br />}
            <Typography variant="caption">{addr.totalMktValueFmt}</Typography>
          </>
        }
      />

      <ListItemSecondaryAction>
        <Checkbox onChange={onCheck} />
      </ListItemSecondaryAction>
    </ListItemButton>
  );
});

// @todo add addrs to state
const addrs: Address[] = [
  newAddress("0xic939d0x98f02123", "matic", ""),
  newAddress("0xabczoj29d8f02456", "eth", "Treasury"),
  newAddress("0xXyzzoj29d8f02098", "op", "Personal"),
];

const SrcValueEnabled: FC = observer(() => {
  const totalSpendLimit = useCreateTxnStore((s) => s.totalSpendLimitFmt);

  return (
    <ListSubheader component="p">Spend Limit: {totalSpendLimit}</ListSubheader>
  );
});
/** ### List of accounts at the `source`/sender side of the transaction
 */
const SrcAddrList: FC = () => {
  // @todo add addrs to state
  // const addrs = useUserStore((s) => s.accounts);

  // build
  const srcAddrElems = addrs.map((a) => <SrcAddr addr={a} key={a.value} />);

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
      subheader={<SrcValueEnabled />}
    >
      {srcAddrElems}
    </List>
  );
};

export default observer(SrcAddrList);
