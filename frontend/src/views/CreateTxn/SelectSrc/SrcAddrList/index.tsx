import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../../../mobx/stores";
// style
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
// components
import SrcAddr from "./SrcAddr";
// interfaces
import { Address, newAddress } from "../../../../mobx/interfaces";

// @todo add addrs to state
const addrs: Address[] = [
  newAddress("0xic939d0x98f02123", "matic", ""),
  newAddress("0xabczoj29d8f02456", "eth", "Treasury"),
  newAddress("0xXyzzoj29d8f02098", "op", "Personal"),
];

const SrcValueEnabled: FC = observer(() => {
  const totalSpendLimit = useCreateTxnStore((s) => s.totalSpendLimitFmt);

  return <ListSubheader>Spend Limit: {totalSpendLimit}</ListSubheader>;
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
