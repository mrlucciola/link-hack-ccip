import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useBaseStore } from "../../../../mobx/stores";
// style
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
// components
import SpendLimit from "./SpendLimit";
// interfaces
import { UserAddress } from "../../../../mobx/interfaces/address";
import { AddrToken } from "../../../../mobx/interfaces/token";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const AddrTokenElem: FC<{ token: AddrToken }> = observer(({ token }) => {
  const currentRootView = useBaseStore((s) => s.currentView);

  return (
    <ListItem
      divider
      dense
      component={Paper}
      ContainerComponent="div"
      sx={{ backgroundColor: "#f4f6fb", pl: 1 }}
    >
      <ListItemAvatar>
        <Grid2
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
            src={token.tokenInfo.img}
            component="div"
          >
            {token.label}
          </Avatar>
          <Grid2 fontSize="0.7em" fontWeight={900} component="div">
            {token.tokenInfo.label}
          </Grid2>
        </Grid2>
      </ListItemAvatar>

      <ListItemText
        primaryTypographyProps={{ fontWeight: 600 }}
        primary={token.amount}
        secondary={token.mktValueFmt}
      />

      {currentRootView === "createTxn" && <SpendLimit token={token} />}
    </ListItem>
  );
});

/**
 * @todo sticky title
 */
const AddrDetailCollapse: FC<{
  addr: UserAddress;
  isOpen: boolean;
}> = ({ addr, isOpen }) => {
  // build
  const tokenElems: JSX.Element[] = Object.values(addr.tokens).map((t) => (
    <AddrTokenElem token={t} key={t.lookupId} />
  ));

  return (
    <ListItem
      sx={{ py: 0, pr: 1, pt: 0.5 }}
      component={"div"}
      ContainerComponent="div"
    >
      <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ flex: 1 }}>
        <List component="div" disablePadding>
          {tokenElems}
        </List>
      </Collapse>
    </ListItem>
  );
};

export default observer(AddrDetailCollapse);
