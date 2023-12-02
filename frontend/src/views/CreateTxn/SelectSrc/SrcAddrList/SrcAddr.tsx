import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../../../mobx/stores";
// style
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
// interfaces
import { Address } from "../../../../mobx/interfaces";
import { fmtCenterEllipsis } from "../../../../layouts/text";
import { InputAdornment } from "@mui/material";

const SpendLimit: FC<{
  addr: Address;
  spendLimitInput: string;
  setSpendLimitInput: (input: string) => void;
}> = ({ addr, spendLimitInput, setSpendLimitInput }) => {
  const setAddrSpendLimit = useCreateTxnStore((s) => s.setAddrSpendLimit);
  const enabledAddr = useCreateTxnStore((s) => s.enabledAddrs.get(addr.value));
  const isEnabled = enabledAddr?.isEnabled;
  // event handler
  const onChangeSpendLimit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // @todo add validation for spend limit
    setSpendLimitInput(e.target.value);
    setAddrSpendLimit(addr, e.target.value);
  };

  return isEnabled ? (
    <TextField
      size="small"
      variant="standard"
      InputLabelProps={{ shrink: true }}
      margin="none"
      InputProps={{
        style: { fontSize: "0.9em" },
        startAdornment: (
          <InputAdornment position="start">
            <Typography variant="caption" mb="0.25em" mr="-0.3em">
              $
            </Typography>
          </InputAdornment>
        ),
      }}
      label="Spend limit"
      value={spendLimitInput}
      onChange={onChangeSpendLimit}
    />
  ) : (
    <></>
  );
};
/** ### Shows controls and info about User's address
 *
 * @todo add validation for spend limit
 */
const SrcAddr: FC<{ addr: Address }> = ({ addr }) => {
  const setAddrStatus = useCreateTxnStore((s) => s.setAddrStatus);
  const enabledAddr = useCreateTxnStore((s) => s.enabledAddrs.get(addr.value));
  const [spendLimitInput, setSpendLimitInput] = useState("");
  const isEnabled = enabledAddr?.isEnabled;

  // event handlers
  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddrStatus(addr, e.target.checked);
  };
  // format values
  const addrFmt = (
    <>
      {fmtCenterEllipsis(addr.value)}
      {addr.blockchainInfo.img?.sm ? (
        <Avatar src={addr.blockchainInfo.img?.sm} />
      ) : (
        <Chip
          label={addr.blockchainInfo.id.toLocaleUpperCase()}
          size="small"
          sx={{ mt: -0.4, mx: 1 }}
          component="span"
        />
      )}
    </>
  );
  // const addrHover = addr.value;
  const primaryText = addr.label || addrFmt;
  const secondaryText = addr.label ? addrFmt : undefined;

  return (
    <ListItemButton component={Paper} selected={isEnabled} dense>
      <ListItemText
        primary={primaryText}
        secondary={
          <>
            {secondaryText}
            {secondaryText && <br />}
            <Typography variant="caption">{addr.totalMktValueFmt}</Typography>
          </>
        }
      />

      <ListItemSecondaryAction
        sx={{
          maxWidth: "35%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
        }}
      >
        <SpendLimit
          addr={addr}
          spendLimitInput={spendLimitInput}
          setSpendLimitInput={setSpendLimitInput}
        />
        <Checkbox onChange={onCheck} />
      </ListItemSecondaryAction>
    </ListItemButton>
  );
};

export default observer(SrcAddr);
