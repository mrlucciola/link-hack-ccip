import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore, useUserStore } from "../../../../mobx/stores";
// style
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
// components
import SrcAddr from "./SrcAddr";

/** ### List subheader displaying spend limit/value enabled to send
 * @todo move spend limit to `TxnOverview` hideable element
 */
const SrcValueEnabled: FC = observer(() => {
  const totalSpendLimit = useCreateTxnStore((s) => s.totalSpendLimitFmt);

  return <ListSubheader>Spend Limit: {totalSpendLimit}</ListSubheader>;
});

/** ### List of addresses at the `source`/sender side of the transaction
 */
const SrcAddrList: FC = () => {
  // @todo add addrs to state
  const addrs = useUserStore((s) => s.addresses);

  // build
  const srcAddrElems: JSX.Element[] = [];
  addrs.forEach((a) => srcAddrElems.push(<SrcAddr addr={a} key={a.value} />));

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
