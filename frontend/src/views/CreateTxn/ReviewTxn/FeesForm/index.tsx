import { FC, useEffect, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useReviewTxnStore } from "../../../../mobx/stores";
// style
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// components
import { CollapseList, CollapseSubheader } from "../utils/components";

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
  const buildFeeRowItems = useReviewTxnStore((s) => s.buildFeeRowItems);
  const feeRowItems = useReviewTxnStore((s) => s.feeRowItems);
  const totalFees = useReviewTxnStore((s) => s.totalFees);

  useEffect(() => {
    buildFeeRowItems();
  }, []);

  return (
    <CollapseList isOpen={isOpen}>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={feeRowItems}
          columns={columns}
          disableRowSelectionOnClick
          getRowId={(row) => row?.blockchain}
          columnHeaderHeight={0}
          density="compact"
          hideFooterPagination
          hideFooterSelectedRowCount
          slots={{ footer: FooterSum }}
          slotProps={{ footer: { slot: `${totalFees}` } }}
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
