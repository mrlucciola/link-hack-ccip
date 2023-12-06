import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore, useUserStore } from "../../../../mobx/stores";
// style
import Button from "@mui/material/Button";
// interfaces
import { Address } from "../../../../mobx/interfaces/address";
import {
  newTransaction,
  Transaction,
} from "../../../../mobx/interfaces/transaction";

/** @deprecated incomplete */
const buildTxn = (address: Address): Transaction => {
  // logic
  const txn = newTransaction(address);

  return txn;
};

const ConfirmSubmitButton: FC = () => {
  const signTxn = useUserStore((s) => s.signTxn);
  const areAllFormsValid = useCreateTxnStore((s) => s.areAllFormsValid);

  /**
   * 1. @todo Optimize addresses to use
   * 1. @todo Build txns from optimized addresses
   * 1. @todo Submit transactions to their respective RPC nodes
   */
  const handleClickSubmit = () => {
    const optimizedAddrs: Address[] = [];
    const signedTxns = optimizedAddrs.map((addr) => {
      const txn = buildTxn(addr);
      const signedTxn = signTxn(addr, txn);

      return signedTxn;
    });

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
