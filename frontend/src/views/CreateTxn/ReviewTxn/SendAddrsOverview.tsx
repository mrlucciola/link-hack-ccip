import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore, useUserStore } from "../../../mobx/stores";
// style
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
// components
import { CollapseList, CollapseSubheader } from "./utils/components";
// utils
import { fmtCenterEllipsis } from "../../../layouts/Text";

const SendAddrItems: FC<{ isOpen: boolean }> = observer(({ isOpen }) => {
  // @todo switch to this
  const enabledAddrs = useCreateTxnStore((s) => s.enabledAddrs);
  const addresses = useUserStore((s) => s.addresses);

  // build jsx list
  const sendAddrsElems: JSX.Element[] = [];
  // For each enabled addr, look up info for display
  enabledAddrs.forEach((a) => {
    const addrOrig = addresses.get(a.lookupId)!;

    // If no label, show address
    const primary = addrOrig.label || fmtCenterEllipsis(addrOrig.value);
    const secondary = addrOrig.label
      ? fmtCenterEllipsis(addrOrig.value, 7)
      : "";

    sendAddrsElems.push(
      <ListItem key={a.lookupId} component="div" ContainerComponent="div">
        <ListItemText
          primary={primary}
          secondary={secondary}
          sx={{ overflow: "hidden", maxWidth: "80%" }}
          primaryTypographyProps={{
            textOverflow: "ellipsis",
            noWrap: true,
            flexWrap: "nowrap",
          }}
          secondaryTypographyProps={{
            textOverflow: "ellipsis",
            noWrap: true,
            flexWrap: "nowrap",
          }}
        />

        <ListItemSecondaryAction
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" mr={1}>
            {a.blockchainInfo.symbol.toLocaleUpperCase()}
          </Typography>
          <Avatar
            src={a.blockchainInfo.img?.sm}
            sx={{ width: "25px", height: "25px" }}
          >
            <Typography>
              {a.blockchainInfo.symbol.toLocaleUpperCase()}
            </Typography>
          </Avatar>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });
  return <CollapseList isOpen={isOpen}>{sendAddrsElems}</CollapseList>;
});

/** ### Send-addresses overview
 * Display the user-addresses used in this transaction.
 *
 * - Address (string)
 * - Label (if set)
 * - @todo Tokens
 */
const SendAddrsOverview: FC = () => {
  const [isOpen, setIsOpen] = useState(false); // @todo revert to true
  const enabledAddrsCt = useCreateTxnStore((s) => s.enabledAddrsCt);

  return (
    <li key={`send-addrs-dropdown`}>
      <CollapseSubheader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Sender addresses used: ${enabledAddrsCt}`}
      />
      <SendAddrItems isOpen={isOpen} />
    </li>
  );
};

export default observer(SendAddrsOverview);
