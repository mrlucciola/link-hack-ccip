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
/** @deprecated placeholder seed data */
export const sendAddrs = new Map<string, EnabledAddr>([
  [
    "maticMumbai-0xic939d0x98f02123",
    new EnabledAddr("0xic939d0x98f02123", "maticMumbai", {
      usdc: newEnabledAddrToken(
        "usdc",
        "maticMumbai",
        "0xic939d0x98f02123",
        11111.1111
      ),
    }),
  ],
  [
    "avaxFuji-0x8us93i09dlwpi09d",
    new EnabledAddr("0x8us93i09dlwpi09d", "avaxFuji", {
      usdc: newEnabledAddrToken(
        "usdc",
        "avaxFuji",
        "0x8us93i09dlwpi09d",
        20000
      ),
      link: newEnabledAddrToken("link", "avaxFuji", "0x8us93i09dlwpi09d", 1.1),
      aave: newEnabledAddrToken(
        "aave",
        "avaxFuji",
        "0x8us93i09dlwpi09d",
        123.9998
      ),
    }),
  ],
  [
    "opGoerli-0xXyzzoj29d8f02098",
    new EnabledAddr("0xXyzzoj29d8f02098", "opGoerli", {
      usdc: newEnabledAddrToken(
        "usdc",
        "opGoerli",
        "0xXyzzoj29d8f02098",
        2993.9829
      ),
      aave: newEnabledAddrToken(
        "aave",
        "opGoerli",
        "0xXyzzoj29d8f02098",
        338.132
      ),
    }),
  ],
  [
    "ethSepolia-0xabczoj29d8f02456",
    new EnabledAddr("0xabczoj29d8f02456", "ethSepolia", {
      usdc: newEnabledAddrToken(
        "usdc",
        "ethSepolia",
        "0xabczoj29d8f02456",
        22.4884
      ),
      aave: newEnabledAddrToken(
        "aave",
        "ethSepolia",
        "0xabczoj29d8f02456",
        0.25123
      ),
      link: newEnabledAddrToken(
        "link",
        "ethSepolia",
        "0xabczoj29d8f02456",
        0.0005
      ),
    }),
  ],
]);

console.log(sendAddrs);

const SendAddrItems: FC<{ isOpen: boolean }> = observer(({ isOpen }) => {
  // @todo switch to this
  // const sendAddrs = useCreateTxnStore((s) => s.enabledAddrs);
  const addresses = useUserStore((s) => s.addresses);

  // build jsx list
  const sendAddrsElems: JSX.Element[] = [];
  // For each enabled addr, look up info for display
  sendAddrs.forEach((a) => {
    const addrOrig = addresses.get(a.value)!;
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

    // If no label, show address
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
