import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useUserStore } from "../../mobx/stores";
// style
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
// components
import {
  CollapseList,
  CollapseSubheader,
} from "../CreateTxn/ReviewTxn/utils/components";
// interfaces
import { UserWallet, newUserWallet } from "../../mobx/interfaces/wallet";

const WalletLabel: FC<{ wallet: UserWallet }> = observer(({ wallet }) => {
  const setWalletAlias = useUserStore((s) => s.setWalletAlias);
  const [isEditing, setIsEditing] = useState(false);
  const [textField, setTextField] = useState(wallet.alias);

  // event handler
  const onChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setTextField(e.currentTarget.value);
  const handleSaveAndClose = (_: any) => {
    setWalletAlias(wallet.lookupId, textField);
    setIsEditing(false);
  };
  const handleCancelAndClose = (_: any) => {
    setTextField(wallet.alias);
    setIsEditing(false);
  };

  return isEditing ? (
    <TextField
      fullWidth
      autoFocus
      autoComplete="off"
      margin="none"
      size="small"
      value={textField}
      onChange={onChangeText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {
              <>
                <IconButton onClick={handleCancelAndClose}>
                  <CancelIcon />
                </IconButton>
                <IconButton onClick={handleSaveAndClose}>
                  <SaveIcon />
                </IconButton>
              </>
            }
          </InputAdornment>
        ),
      }}
    />
  ) : (
    <Grid
      container
      direction="row"
      flex={1}
      wrap="nowrap"
      overflow="hidden"
      onClick={() => setIsEditing(true)}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid
        sx={{
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          textWrap: "nowrap",
        }}
      >
        {wallet.alias}
      </Grid>
      <Grid>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
});

const WalletElem: FC<{ wallet: UserWallet }> = observer(({ wallet }) => {
  const addrCt = (
    <Grid container direction="row" ml={1} mt={1} component="span">
      <Typography variant="caption" component="span">
        Addresses:
      </Typography>
      <Typography pl={1} variant="caption" component="span">
        {wallet.derivedKeyIdxs.length}
      </Typography>
    </Grid>
  );
  const primaryText = <WalletLabel wallet={wallet} />;
  const secondaryText = (
    <>
      {addrCt}
      {addrCt}
    </>
  );

  return (
    <ListItem component="div" sx={{ p: 1 }}>
      <ListItemText
        primaryTypographyProps={{ fontWeight: 900 }}
        primary={primaryText}
        secondary={secondaryText}
      />
    </ListItem>
  );
});

/** ### Collapsible view for a user's root wallets
 */
const RootWallets: FC = () => {
  const [isOpen, setIsOpen] = useState(false); // @todo default: false
  const wallets = useUserStore((s) => s.rootWallets);
  const setRootWallets = useUserStore((s) => s.setRootWallets);

  // event handlers
  const onClickCreateNewWallet = (_: any) => {
    const newWallet = newUserWallet(`Wallet ${wallets.size + 1}`);
    setRootWallets([newWallet]);
  };
  /** @todo Open modal */
  const onClickAddExistingWallet = (_: any) => {};

  // Build wallet elems
  const walletElems: JSX.Element[] = [];
  wallets.forEach((w) => {
    walletElems.push(<WalletElem wallet={w} key={`wallet-${w.address}`} />);
  });

  return (
    <li key={`root-wallets-dropdown`}>
      <CollapseSubheader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Wallets`}
      />
      <CollapseList isOpen={isOpen}>
        <Grid container direction="row" wrap="nowrap" flex={1}>
          <Button
            variant="contained"
            onClick={onClickCreateNewWallet}
            sx={{ px: 1, textTransform: "none", flex: 1 }}
          >
            Create new wallet
          </Button>
          <Button
            variant="contained"
            onClick={onClickAddExistingWallet}
            sx={{ px: 1, textTransform: "none", flex: 1 }}
          >
            Add existing wallet
          </Button>
        </Grid>
        {walletElems}
      </CollapseList>
    </li>
  );
};

export default observer(RootWallets);
