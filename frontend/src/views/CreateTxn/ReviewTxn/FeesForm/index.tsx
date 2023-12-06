import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore, useReviewTxnStore } from "../../../../mobx/stores";
// style
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// components
import { CollapseList, CollapseSubheader } from "..";
// interfaces
import {
  BlockchainId,
  fetchTxnCost,
} from "../../../../mobx/data/supportedBlockchains";
// utils
import { mktValueFmt } from "../../../../utils/fmt";
// @delete
import { sendAddrs } from "../SendAddrsOverview";

const FooterSum: FC = observer(() => {
  const totalFeesFmt = useReviewTxnStore((s) => s.totalFeesFmt);

  return (
    <Box p={1}>
      <Typography variant="subtitle1">Total: {totalFeesFmt}</Typography>
    </Box>
  );
});

const columns: GridColDef[] = [{ field: "blockchain" }, { field: "txnCost" }];

const FeesItems: FC<{ isOpen: boolean }> = observer(({ isOpen }) => {
  const setTotalFees = useReviewTxnStore((s) => s.setTotalFees);

  // @todo replace
  // const enabledAddrs = useCreateTxnStore((s) => s.enabledAddrs);
  const enabledAddrs = sendAddrs;

  // @todo other txn specific info likeadd gas amt
  const bcStore = new Map<BlockchainId, number>();
  enabledAddrs.forEach((a) => {
    const newTxnCt = bcStore.get(a.blockchainId)
      ? bcStore.get(a.blockchainId)! + 1
      : 1;
    bcStore.set(a.blockchainId, newTxnCt);
  });

  // build
  let totalTxnCost = 0;
  const rows: { blockchain: string; txnCost: string }[] = [];
  bcStore.forEach((txnCt, blockchain) => {
    // fee amt per txn
    const txnCost = fetchTxnCost(blockchain);
    totalTxnCost += txnCost;
    rows.push({
      blockchain: blockchain.toLocaleUpperCase(),
      txnCost: mktValueFmt(txnCost * txnCt),
    });
  });
  // @note there should be a better way to do this, possibly move to state
  setTotalFees(totalTxnCost);

  return (
    <CollapseList isOpen={isOpen}>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          getRowId={(row) => row?.blockchain}
          columnHeaderHeight={0}
          density="compact"
          hideFooterPagination
          hideFooterSelectedRowCount
          slots={{ footer: FooterSum }}
          slotProps={{ footer: { slot: `${totalTxnCost}` } }}
        />
      </Box>
    </CollapseList>
  );
});

/** ### Fees form
 * Review and adjust the (one or many) network fees.
 *
 * - For each blockchain, show the dollar cost
 * - (hidden in popover, needed for calculation) Estimated gas units
 * - (hidden in popover) Market avg for gas price
 */
const FeesForm: FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const totalFeesFmt = useReviewTxnStore((s) => s.totalFeesFmt);

  return (
    <li key={`fees-dropdown`}>
      <CollapseSubheader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Fees: ${totalFeesFmt}`}
      />
      <FeesItems isOpen={isOpen} />
    </li>
  );
};

export default observer(FeesForm);
