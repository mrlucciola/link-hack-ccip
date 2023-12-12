import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useUserStore } from "../../mobx/stores";
// style
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import AvatarGroup from "@mui/material/AvatarGroup";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// components
import {
  CollapseList,
  CollapseSubheader,
} from "../CreateTxn/ReviewTxn/utils/components";
// interfaces
import { getBlockchainInfo } from "../../mobx/data/supportedBlockchains";
import { AddrToken } from "../../mobx/interfaces/token";
import { TokenId } from "../../mobx/data/tokens";
import { fmtMktValue } from "../../utils/fmt";

/** Copied from AddrTokenElem */
const TokenElem: FC<{
  tokenHoldings: { sum: number; addrTokens: AddrToken[] };
}> = observer(({ tokenHoldings }) => {
  const { sum, addrTokens } = tokenHoldings;
  const { tokenInfo } = addrTokens[0];
  const sumMktValue = tokenInfo.mktValue * sum;
  const sumMktValueFmt = fmtMktValue(sumMktValue);
  // Create a list of blockchains where token is held by user
  const blockchains = Array.from(
    new Set(addrTokens.map((a) => getBlockchainInfo(a.blockchainId)))
  );

  const blockchainElems = blockchains.map((bc, idx) => {
    return (
      <Avatar
        sx={{ width: 25, height: 25, fontSize: "8pt" }}
        key={`${bc}${idx}`}
        src={bc.img?.sm}
        // @todo add tooltip to show label
      >
        {bc.symbol.toLocaleUpperCase()}
      </Avatar>
    );
  });

  return (
    <ListItem
      divider
      dense
      component={Paper}
      ContainerComponent="div"
      sx={{ backgroundColor: "#f4f6fb", pl: 1 }}
    >
      <ListItemAvatar>
        <Grid
          container
          direction="column"
          wrap="nowrap"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            sx={{
              fontSize: "0.7em",
              fontWeight: 900,
              height: "25px",
              width: "25px",
            }}
            src={tokenInfo.img}
            component="div"
          >
            {tokenInfo.label}
          </Avatar>
          <Grid fontSize="0.7em" fontWeight={900} component="div">
            {tokenInfo.label}
          </Grid>
        </Grid>
      </ListItemAvatar>

      <ListItemText
        primaryTypographyProps={{ fontWeight: 600 }}
        primary={sum}
        secondary={sumMktValueFmt}
      />
      <ListItemSecondaryAction>
        <AvatarGroup spacing={10} max={4}>
          {blockchainElems}
        </AvatarGroup>
      </ListItemSecondaryAction>

      {/* {currentRootView === "createTxn" && <SpendLimit token={token} />} */}
    </ListItem>
  );
});

/** ### Collapsible view for a user's token holdings
 */
const TokenHoldings: FC = () => {
  const [isOpen, setIsOpen] = useState(false); // @todo default: false
  const addrs = useUserStore((s) => s.addresses);

  // calc token holdings
  const tokenMap = new Map<TokenId, { sum: number; addrTokens: AddrToken[] }>();
  addrs.forEach((addr) => {
    Object.values(addr.tokens).forEach((token) => {
      const foundToken = tokenMap.get(token.id);
      if (!foundToken) {
        const tokenMapValue = { sum: token.amount, addrTokens: [token] };
        tokenMap.set(token.id, tokenMapValue);
      } else {
        const tokenMapValue = {
          sum: foundToken.sum + token.amount,
          addrTokens: [...foundToken.addrTokens, token],
        };
        tokenMap.set(token.id, tokenMapValue);
      }
    });
  });

  // Build wallet elems
  const tokenElems: JSX.Element[] = [];
  tokenMap.forEach((t) => {
    tokenElems.push(
      <TokenElem tokenHoldings={t} key={`wallet-${t.addrTokens[0].id}`} />
    );
  });

  return (
    <li key={`token-holdings-dropdown`}>
      <CollapseSubheader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Tokens`}
      />
      <CollapseList isOpen={isOpen}>{tokenElems}</CollapseList>
    </li>
  );
};

export default observer(TokenHoldings);
