import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore, useUserStore } from "../../../mobx/stores";
// style
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

/** @todo add validation */
const SendAmtField: FC = () => {
  const sendAmt = useCreateTxnStore((s) => s.totalSendAmt);
  const setSendAmt = useCreateTxnStore((s) => s.setSendAmt);
  const portfolioMktValueFmt = useUserStore((s) => s.portfolioMktValueFmt);
  const [sendAmtInput, setSendAmtInput] = useState(`${sendAmt}` || `0`);

  const [helpText, _setHelpText] = useState("");
  // event handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // @todo validate here
    setSendAmtInput(e.currentTarget.value);
    setSendAmt(e.currentTarget.value);
  };

  return (
    <Grid container direction="row" flex={1} sx={{ mt: 1, mx: 1 }}>
      <TextField
        fullWidth
        autoComplete="off"
        size="small"
        label={`Send amount - Portfolio: ${portfolioMktValueFmt}`}
        // input
        onChange={handleChange}
        value={sendAmtInput}
        // validation
        error={!!helpText}
        helperText={helpText}
        FormHelperTextProps={{ sx: { my: 0 } }}
      />
    </Grid>
  );
};

export default observer(SendAmtField);
