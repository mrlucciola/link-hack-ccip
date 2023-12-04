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
import { Address } from "../../../../mobx/interfaces/address";
import { AddrToken } from "../../../../mobx/interfaces/token";
// utils
import { mktValueFmt } from "../../../../utils/fmt";
import { lookupTokenMktValue } from "../../../../mobx/data/tokens";

const SpendLimitField: FC<{
  /** @deprecated */
  addr?: Address;
  token: AddrToken;
  enabledAddrToken: EnabledAddrToken | undefined;
}> = observer(({ token, enabledAddrToken }) => {
  const setEnabledAddrTokenSpendLimit = useCreateTxnStore(
    (s) => s.setEnabledAddrTokenSpendLimit
  );
  // @todo move lookup to class
  const spendLimitMktValue = enabledAddrToken
    ? lookupTokenMktValue(token.id) * enabledAddrToken.spendLimit
    : 0;
  const spendLimitMktValueFmt = mktValueFmt(spendLimitMktValue);

  const [spendLimitInput, setSpendLimitInput] = useState(
    enabledAddrToken ? `${enabledAddrToken.spendLimit}` : `${token.amount}`
  );
  // event handler
  const onChangeSpendLimit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // @todo add validation for spend limit
    setSpendLimitInput(e.target.value);
    setEnabledAddrTokenSpendLimit(token, e.target.value);
  };

  return enabledAddrToken && enabledAddrToken.isEnabled ? (
    <TextField
      size="small"
      variant="standard"
      label="Spend limit"
      value={spendLimitInput}
      onChange={onChangeSpendLimit}
      helperText={spendLimitMktValueFmt}
      InputLabelProps={{ shrink: true, sx: { mt: 0.1 } }}
      InputProps={{ style: { fontSize: "0.9em" } }}
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
      <SpendLimitField token={token} enabledAddrToken={enabledAddrToken} />
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
