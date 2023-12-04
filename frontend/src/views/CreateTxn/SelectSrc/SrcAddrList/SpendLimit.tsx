import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../../../mobx/stores";
// style
import Checkbox from "@mui/material/Checkbox";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import TextField from "@mui/material/TextField";
// interfaces
import { EnabledAddrToken } from "../../interfaces";
import { AddrToken } from "../../../../mobx/interfaces/token";

/** ### "Spend-limit" field for an address-held token  */
const SpendLimitField: FC<{
  token: AddrToken;
  enabledAddrToken: EnabledAddrToken;
}> = observer(({ token, enabledAddrToken }) => {
  const setEnabledAddrTokenSpendLimit = useCreateTxnStore(
    (s) => s.setEnabledAddrTokenSpendLimit
  );
  const [spendLimitInput, setSpendLimitInput] = useState(
    `${enabledAddrToken.spendLimit}` || `${token.amount}`
  );
  // event handler
  const onChangeSpendLimit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSpendLimitInput(e.target.value);
    // @todo can we use just mobx state for form?
    setEnabledAddrTokenSpendLimit(token, e.target.value);
  };

  return enabledAddrToken.isEnabled ? (
    <TextField
      size="small"
      variant="standard"
      // label text
      label="Spend limit"
      InputLabelProps={{ shrink: true, sx: { mt: 0.1 } }}
      // input text
      value={spendLimitInput}
      onChange={onChangeSpendLimit}
      InputProps={{ style: { fontSize: "0.9em" } }}
      // helper text
      helperText={enabledAddrToken.mktValueFmt}
      FormHelperTextProps={{ margin: "dense", sx: { mt: 0 } }}
    />
  ) : (
    <></>
  );
});

const SpendLimit: FC<{ token: AddrToken }> = ({ token }) => {
  const setEnabledAddrTokenStatus = useCreateTxnStore(
    (s) => s.setEnabledAddrTokenStatus
  );
  const enabledAddrToken = useCreateTxnStore((s) =>
    s.enabledTokens.get(token.lookupId)
  );
  const isEnabled = enabledAddrToken?.isEnabled;

  // event handler
  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnabledAddrTokenStatus(token, e.target.checked);
  };

  return (
    <ListItemSecondaryAction
      sx={{
        maxWidth: "40%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
      }}
    >
      {isEnabled && (
        <SpendLimitField token={token} enabledAddrToken={enabledAddrToken} />
      )}
      <Checkbox
        checked={isEnabled || false}
        onChange={onCheck}
        inputProps={{ "aria-label": "controlled" }}
        sx={{ pr: 0, pl: 0.5 }}
      />
    </ListItemSecondaryAction>
  );
};

export default observer(SpendLimit);
