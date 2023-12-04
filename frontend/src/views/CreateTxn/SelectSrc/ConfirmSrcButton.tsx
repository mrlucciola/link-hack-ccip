import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../../mobx/stores";
// style
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

/** ### "Confirm sources" button
 *
 * Click advances user to "Review-Txn" view.
 *
 * Button is disabled when:
 *    - No accounts are selected;
 *    - Spend limit is less than send amount;
 */
const ConfirmSrcButton: FC = () => {
  const setCurrentView = useCreateTxnStore((s) => s.setCurrentView);
  // Conditions for progressing to review stage
  const isSpendLimitGtSendAmt = useCreateTxnStore(
    (s) => s.isSpendLimitGtSendAmt
  );
  const enabledAddrsCt = useCreateTxnStore((s) => s.enabledAddrsCt);
  const isEnabledAddrsCtGt0 = enabledAddrsCt > 0;
  const handleNextView = () => setCurrentView("reviewTxn");

  return (
    <Button
      variant="contained"
      component="div"
      sx={{ flexDirection: "column", textTransform: "none" }}
      disabled={!(isSpendLimitGtSendAmt && isEnabledAddrsCtGt0)}
      // @todo change view to "review txn"
      onClick={handleNextView}
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
