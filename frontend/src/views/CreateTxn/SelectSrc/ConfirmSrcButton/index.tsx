import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../../../mobx/stores";
// style
import { Button, Typography } from "@mui/material";

/** ### "Confirm sources" button
 *
 * Click advances user to "Review-Txn" view.
 *
 * Button is disabled when:
 *    - No accounts are selected;
 *    - Spend limit is less than send amount;
 */
const ConfirmSrcButton: FC = () => {
  // conditions for enabling advancement
  const isSpendLimitGtSendAmt = useCreateTxnStore(
    (s) => s.isSpendLimitGtSendAmt
  );
  const enabledAddrsCt = useCreateTxnStore((s) => s.enabledAddrsCt);
  const isEnabledAddrsCtGt0 = enabledAddrsCt > 0;

  return (
    <Button
      variant="contained"
      component="div"
      sx={{ flexDirection: "column", textTransform: "none" }}
      disabled={!(isSpendLimitGtSendAmt && isEnabledAddrsCtGt0)}
      // @todo change view to "review txn"
      // onClick={handle}
    >
      <Typography variant="body1" fontWeight={600}>
        Confirm
      </Typography>
      <Typography variant="caption">
        (Continue to transaction review)
      </Typography>
    </Button>
  );
};

export default observer(ConfirmSrcButton);
