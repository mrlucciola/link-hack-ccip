import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../../../mobx/stores";
// style
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// components
import AddrDetailCollapse from "./AddrDetailCollapse";
// interfaces
import { UserAddress } from "../../../../mobx/interfaces/address";
// utils
import { fmtCenterEllipsis } from "../../../../layouts/Text";

/** ### Shows controls and info about User's address
 *
 * @todo add validation for spend limit
 */
const SrcAddr: FC<{ addr: UserAddress }> = ({ addr }) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const enabledAddr = useCreateTxnStore((s) =>
    s.enabledAddrs.get(addr.lookupId)
  );
  const isEnabled = enabledAddr?.isEnabled;

  // event handlers
  const toggleCollapse = () => setIsCollapseOpen(!isCollapseOpen);
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
      <ListItemButton
        component={Paper}
        selected={isEnabled}
        dense
        onClick={toggleCollapse}
      >
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

        {isCollapseOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      <AddrDetailCollapse addr={addr} isOpen={isCollapseOpen} />
    </>
  );
};

export default observer(SrcAddr);
