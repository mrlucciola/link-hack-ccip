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
import { AddrToken, Address } from "../../../../mobx/interfaces/address";
// utils
import { mktValueFmt } from "../../../../utils/fmt";
import { lookupTokenMktValue } from "../../../../mobx/data/tokens";

const SpendLimitField: FC<{
  addr: Address;
  token: AddrToken;
  enabledAddrToken: EnabledAddrToken | undefined;
}> = observer(({ addr, token, enabledAddrToken }) => {
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
    setEnabledAddrTokenSpendLimit(addr, token.id, e.target.value);
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

const SpendLimit: FC<{ addr: Address; token: AddrToken }> = ({
  addr,
  token,
}) => {
  const setEnabledAddrTokenStatus = useCreateTxnStore(
    (s) => s.setEnabledAddrTokenStatus
  );
  const enabledTokenId = useCreateTxnStore((s) =>
    s.getEnabledTokenId(token.id, addr)
  );
  const enabledAddrToken = useCreateTxnStore((s) =>
    s.enabledTokens.get(enabledTokenId)
  );
  // const enabledAddrToken = getEnabledAddrToken(addr, token.id);
  const isEnabled = enabledAddrToken?.isEnabled;

  // event handler
  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnabledAddrTokenStatus(addr, token, e.target.checked);
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
      <SpendLimitField
        addr={addr}
        token={token}
        enabledAddrToken={enabledAddrToken}
      />
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
