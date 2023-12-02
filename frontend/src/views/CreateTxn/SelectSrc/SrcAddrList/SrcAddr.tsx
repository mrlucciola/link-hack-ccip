import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../../../mobx/stores";
// style
import {
  Avatar,
  Checkbox,
  Chip,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
// interfaces
import { Address } from "../../../../mobx/interfaces";
import { fmtCenterEllipsis } from "../../../../layouts/text";

const SrcAddr: FC<{ addr: Address }> = ({ addr }) => {
  const [isSelected, setIsSelected] = useState(false);
  const setAddrStatus = useCreateTxnStore((s) => s.setAddrStatus);

  // event handlers
  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddrStatus(addr, e.target.checked);
    setIsSelected(e.target.checked);
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
    <ListItemButton component={Paper} selected={isSelected} dense>
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

      <ListItemSecondaryAction>
        <Checkbox onChange={onCheck} />
      </ListItemSecondaryAction>
    </ListItemButton>
  );
};

export default observer(SrcAddr);
