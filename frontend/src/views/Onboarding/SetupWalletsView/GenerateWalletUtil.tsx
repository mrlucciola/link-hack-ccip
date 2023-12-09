import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useOnboardingStore } from "../../../mobx/stores";
// style
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FaCopy } from "react-icons/fa";
// interfaces
import { UserWallet, newUserWallet } from "../interfaces";

const textInfoStyle = {
  "& .MuiInputBase-input": {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};
const CopyIconAdornment = (
  <InputAdornment position="end">
    <IconButton edge="end" size="small">
      <FaCopy />
    </IconButton>
  </InputAdornment>
);

const KeyField: FC<{ label: string; value: string; isMultiline?: boolean }> =
  observer(({ label, value, isMultiline }) => {
    return (
      <TextField
        fullWidth
        size="small"
        disabled
        variant="filled"
        sx={textInfoStyle}
        margin="none"
        InputProps={{ endAdornment: CopyIconAdornment }}
        InputLabelProps={{ shrink: true }}
        multiline={isMultiline}
        label={label}
        value={value}
      />
    );
  });

/** ### Open modal and generate a new wallet
 *
 * Adds randomly generated wallet to state using a setter.
 */
const openModal =
  (handleOpen: () => void, setter: (wallet: UserWallet) => void) => () => {
    handleOpen();
    const newWallet = newUserWallet();
    setter(newWallet);
  };

/** ### Create a new wallet with a random seed
 *
 * @todo research best way to securely generate wallet in an insecure context
 * @todo refactor to simplify jsx
 */
const GenerateWalletUtil: FC = () => {
  const addNewWallet = useOnboardingStore((s) => s.addNewWallet);
  const setCurrentWallet = useOnboardingStore((s) => s.setCurrentWallet);
  const setCurrentWalletAlias = useOnboardingStore(
    (s) => s.setCurrentWalletAlias
  );
  const currentWallet = useOnboardingStore((s) => s.currentWallet);
  const [alias, setAlias] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // event handlers
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setCurrentWalletAlias(alias);
    addNewWallet(currentWallet);
    setAlias("");
  };

  return (
    <Grid p={1}>
      <Button
        variant="contained"
        fullWidth
        onClick={openModal(handleOpen, setCurrentWallet)}
      >
        Generate new wallet
      </Button>
      <Modal open={isOpen} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            px: 3,
            pt: 2,
            pb: 1,
            borderRadius: 3,
            maxHeight: "300px",
          }}
          flexWrap="nowrap"
          overflow="hidden scroll"
        >
          <Typography variant="h6" component="h2">
            Your new wallet
          </Typography>
          <Typography sx={{ my: 1 }}>
            Please store this information in a secure manner. This message will
            not display again.
          </Typography>
          <Grid container direction="column">
            <TextField
              fullWidth
              size="small"
              margin="dense"
              focused
              label="Set a name for your wallet:"
              value={alias}
              onChange={(e) => setAlias(e.currentTarget.value)}
            />
            <KeyField label="Public address" value={currentWallet.address} />
            <KeyField label="Private key" value={currentWallet.privateKey} />
            <KeyField
              label="Secret mnemonic/seed phrase"
              value={currentWallet.mnemonic?.phrase!}
              isMultiline={true}
            />
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 1 }}
            onClick={handleClose}
          >
            Create wallet
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};

export default observer(GenerateWalletUtil);
