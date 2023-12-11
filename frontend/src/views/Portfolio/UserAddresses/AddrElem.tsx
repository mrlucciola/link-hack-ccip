import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
// style
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";
// components
import AddrDetailCollapse from "../../CreateTxn/SelectSrc/SrcAddrList/AddrDetailCollapse";
// interfaces
import { UserAddress } from "../../../mobx/interfaces/address";
import { fmtCenterEllipsis } from "../../../layouts/Text";

const AddrElem: FC<{ addr: UserAddress }> = ({ addr }) => {
  const [isOpen, setIsOpen] = useState(false);

  // event handlers
  const toggleCollapse = () => setIsOpen(!isOpen);
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
          sx={{ mt: -0.4, mx: 1, fontWeight: "500" }}
          component="span"
        />
      )}
    </>
  );

  const primaryText = addr.label || addrFmt;
  const secondaryText = addr.label ? addrFmt : undefined;

  return (
    <>
      <ListItemButton component={Paper} dense onClick={toggleCollapse}>
        <ListItemText
          primaryTypographyProps={{ fontWeight: 900 }}
          primary={primaryText}
          secondary={
            <>
              {secondaryText}
              {secondaryText && <br />}
              <Typography variant="caption">{addr.totalMktValueFmt}</Typography>
            </>
          }
        />

        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      <AddrDetailCollapse addr={addr} isOpen={isOpen} />
    </>
  );
};

export default observer(AddrElem);
