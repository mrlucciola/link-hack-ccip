import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore, useReviewTxnStore } from "../../../../mobx/stores";
// style
import Button from "@mui/material/Button";
// interfaces

const ConfirmSubmitButton: FC = () => {
  const areAllFormsValid = useCreateTxnStore((s) => s.areAllFormsValid);
  const buildAndSignTxns = useReviewTxnStore((s) => s.buildAndSignTxns);
  const stagedTokens = useReviewTxnStore((s) => s.stagedTokens);

  /**
   * 1. @todo Optimize addresses to use
   * 1. @todo Build txns from optimized addresses
   * 1. @todo Submit transactions to their respective RPC nodes
   */
  const handleClickSubmit = async () => {
    const signedTxns = await buildAndSignTxns(stagedTokens);

    signedTxns.forEach((st) => {
      console.log("sending signed transaction:", st);
    });
  };

  return (
    <Button
      disabled={!areAllFormsValid}
      variant="contained"
      onClick={handleClickSubmit}
    >
      Confirm and submit
    </Button>
  );
};

export default observer(ConfirmSubmitButton);
