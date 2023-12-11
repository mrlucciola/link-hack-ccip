import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore,  } from "../../../mobx/stores";
// style
import Button from "@mui/material/Button";
import transferTokens from "../../../scripts/transfer-tokens";
// interfaces
// import { EnabledAddr } from "../../interfaces";

const ConfirmSubmitButton: FC = () => {
  const areAllFormsValid = useCreateTxnStore((s) => s.areAllFormsValid);
  // const buildAndSignTxns = useReviewTxnStore((s) => s.buildAndSignTxns);
  // const stagedTokens = useReviewTxnStore((s) => s.stagedTokens);

  /**
   * 1. @todo Optimize addresses to use
   * 1. @todo Build txns from optimized addresses
   * 1. @todo Submit transactions to their respective RPC nodes
   */
  const handleClickSubmit = async () => {
    // const optimizedAddrs: EnabledAddr[] = [];

    // const signedTxns = await buildAndSignTxns(optimizedAddrs);
    // const signedTxns = await buildAndSignTxns(stagedTokens);

    // signedTxns.forEach((st) => {
    //   console.log("sending signed transaction:", st);
    // });
    transferTokens(
      "ethereumSepolia",
      "polygonMumbai",
      "0xcb6A4EA723faAbFdc3ac528fCb4c4b52767505a1",
      "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05",
      1000000000000000,
      "0x779877A7B0D9E8603169DdbD7836e478b4624789"
    );
    console.log("called in btx comp");
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
