import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../../mobx/stores";
// style
import { TextField } from "@mui/material";

// @todo add to state
export const validationSendAmt = {};

/**
 * @todo hide/de-render when contact search is open
 * @todo spacing & layout
 * @todo wire-up state
 */
const SendAmtField: FC = () => {
  const sendAmt = useCreateTxnStore((s) => s.totalSendAmt);
  const setSendAmt = useCreateTxnStore((s) => s.setSendAmt);
  const [sendAmtInput, setSendAmtInput] = useState(`${sendAmt}` || `0`);
  const portfolioValueUsdc = 1829021.23;
  // @todo set up in store
  const [helpText, _setHelpText] = useState("");
  // event handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSendAmtInput(e.currentTarget.value);
    setSendAmt(e.currentTarget.value);
  };
  console.log("sendAmt", sendAmt);

  return (
    <TextField
      size="small"
      label={`Send amount - Portfolio: ${portfolioValueUsdc} USDC`}
      sx={{ mt: 1, mx: 1 }}
      // input
      onChange={handleChange}
      value={sendAmtInput}
      // validation
      error={!!helpText}
      helperText={helpText}
      FormHelperTextProps={{ sx: { my: 0 } }}
    />
  );
};

export default observer(SendAmtField);
