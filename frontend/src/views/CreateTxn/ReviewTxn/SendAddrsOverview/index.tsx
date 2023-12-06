import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore, useUserStore } from "../../../../mobx/stores";
// style
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
// components
import { CollapseList, CollapseSubheader } from "..";
// interfaces
import { EnabledAddr, newEnabledAddrToken } from "../../interfaces";
// utils
import { fmtCenterEllipsis } from "../../../../layouts/Text";

// const sendAddrs = useCreateTxnStore((s) => s.enabledAddrs);
export const sendAddrs = new Map<string, EnabledAddr>([
  [
    "matic-0xic939d0x98f02123",
    new EnabledAddr("matic-0xic939d0x98f02123", "matic", {
      usdc: newEnabledAddrToken(
        "usdc",
        "matic",
        "0xic939d0x98f02123",
        11111.1111
      ),
    }),
  ],
  [
    "avax-0x8us93i09dlwpi09d",
    new EnabledAddr("avax-0x8us93i09dlwpi09d", "avax", {
      usdc: newEnabledAddrToken("usdc", "avax", "0x8us93i09dlwpi09d", 20000),
      mkr: newEnabledAddrToken("mkr", "avax", "0x8us93i09dlwpi09d", 1.1),
      aave: newEnabledAddrToken("aave", "avax", "0x8us93i09dlwpi09d", 123.9998),
    }),
  ],
  [
    "op-0xXyzzoj29d8f02098",
    new EnabledAddr("op-0xXyzzoj29d8f02098", "op", {
      usdc: newEnabledAddrToken("usdc", "op", "0xXyzzoj29d8f02098", 2993.9829),
      aave: newEnabledAddrToken("aave", "op", "0xXyzzoj29d8f02098", 338.132),
    }),
  ],
  [
    "eth-0xabczoj29d8f02456",
    new EnabledAddr("eth-0xabczoj29d8f02456", "eth", {
      usdc: newEnabledAddrToken("usdc", "eth", "0xabczoj29d8f02456", 22.4884),
      aave: newEnabledAddrToken("aave", "eth", "0xabczoj29d8f02456", 0.25123),
      mkr: newEnabledAddrToken("mkr", "eth", "0xabczoj29d8f02456", 0.0005),
    }),
  ],
]);

console.log(sendAddrs);

const SendAddrItems: FC<{ isOpen: boolean }> = observer(({ isOpen }) => {
  // const sendAddrs = useCreateTxnStore((s) => s.enabledAddrs);
  const addresses = useUserStore((s) => s.addresses);

  // build
  const sendAddrsElems: JSX.Element[] = [];
  sendAddrs.forEach((a) => {
    // @todo fix - the addr shouldnt have a hyphen in it
    const addrOrig = addresses.get(a.value.split("-")[1])!;
    // format values
    const addrFmt = (
      <>
        {fmtCenterEllipsis(addrOrig.value)}
        {addrOrig.blockchainInfo.img?.sm ? (
          <Avatar src={addrOrig.blockchainInfo.img?.sm} />
        ) : (
          <Chip
            label={addrOrig.blockchainInfo.id.toLocaleUpperCase()}
            size="small"
            sx={{ mt: -0.4, mx: 1, fontWeight: "500" }}
            component="span"
          />
        )}
      </>
    );

    const primaryText = addrOrig.label || addrFmt;
    const secondaryText = addrOrig.label ? addrFmt : undefined;
    sendAddrsElems.push(
      <ListItem key={`${a.lookupId}`} component="div">
        <ListItemText
          primaryTypographyProps={{ fontWeight: 900 }}
          primary={primaryText}
          secondary={
            <>
              {secondaryText}
              {secondaryText && <br />}
              <Typography variant="caption">
                {addrOrig.totalMktValueFmt}
              </Typography>
            </>
          }
        />
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
