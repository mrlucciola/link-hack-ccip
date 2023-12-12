import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useUserStore } from "../../../mobx/stores";
// style
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import IconButton from "@mui/material/IconButton";
// components
import AddrDetailCollapse from "../../CreateTxn/SelectSrc/SrcAddrList/AddrDetailCollapse";
// interfaces
import { UserAddress } from "../../../mobx/interfaces/address";
import { fmtCenterEllipsis } from "../../../layouts/Text";
import { UserWallet } from "../../../mobx/interfaces/wallet";
import { trace } from "mobx";

const AddrElem: FC<{
  addr: UserAddress;
  rootWallets: Map<string, UserWallet>;
}> = ({ addr, rootWallets }) => {
  const [isOpen, setIsOpen] = useState(false);
  const getWalletAlias = useUserStore((s) => s.getWalletAlias);
  const alias = rootWallets.get(addr.rootWalletLookupId)?.alias;
  const walletAlias = getWalletAlias(addr);
  trace(true)
  // const rootWallets = useUserStore((s) => s.rootWallets);
  // const rootWallet = useUserStore((s) =>
  //   s.rootWallets.get(addr.rootWalletLookupId)
  // );
  // const alias = useUserStore(
  //   (s) => s.rootWallets.get(addr.rootWalletLookupId)!.alias
  // );
  // const wallet = rootWallets.get(addr.rootWalletLookupId)!;
  // const walletAlias = wallet.alias;
  // const walletAlias = getRootWallet(addr).alias;
  // event handlers
  const toggleCollapse = () => setIsOpen(!isOpen);
  // console.log("AE:", walletAlias, addr.label, alias);

  // build text elems
  const primaryText = (
    <Grid container direction="row" flex={1} wrap="nowrap">
      <Grid flex={1}>{addr.label || fmtCenterEllipsis(addr.value)}</Grid>
      {addr.blockchainInfo.img?.sm ? (
        <Avatar
          src={addr.blockchainInfo.img?.sm}
          sx={{ height: "25px", width: "25px" }}
        />
      ) : (
        <Chip
          label={addr.blockchainInfo.symbol.toLocaleUpperCase()}
          size="small"
          sx={{
            mt: -0.4,
            mx: 1,
            fontWeight: "500",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textWrap: "nowrap",
          }}
          component="span"
        />
      )}
    </Grid>
  );
  // const secondaryText = addr.label ? addrFmt : undefined;
  const walletText = (
    <Typography variant="caption">{getWalletAlias(addr)}</Typography>
  );
  const mktValueText = (
    <Typography variant="caption">{addr.totalMktValueFmt}</Typography>
  );

  return (
    <>
      <ListItem component={Paper} dense>
        <ListItemText
          primaryTypographyProps={{ fontWeight: 900 }}
          primary={primaryText}
          secondary={
            <>
              {addr.label && fmtCenterEllipsis(addr.value)}
              <Grid container direction="column" component="span">
                {walletText}
                {mktValueText}
              </Grid>
            </>
          }
        />
        <IconButton sx={{ borderRadius: "5px" }} onClick={toggleCollapse}>
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </ListItem>

      <AddrDetailCollapse addr={addr} isOpen={isOpen} />
    </>
  );
};

export default observer(AddrElem);
