import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { UserWallet, newUserWallet, useOnboardingState } from "../store";
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { FaCopy } from "react-icons/fa";

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

const KeyField: FC<{ label: string; value: string; isMultiline?: boolean }> = ({
  label,
  value,
  isMultiline,
}) => {
  return (
    <TextField
      fullWidth
      size="small"
      disabled
      variant="filled"
      sx={textInfoStyle}
      margin="none"
      InputProps={{ endAdornment: CopyIconAdornment }}
      multiline={isMultiline}
      label={label}
      value={value}
    />
  );
};

/** ## Open model and generate a new wallet/private key
 *
 * Adds randomly generated wallet to state using a setter.
 */
const openModal =
  (handleOpen: () => void, setter: (wallet: UserWallet) => void) => () => {
    handleOpen();
    const newWallet = newUserWallet();
    setter(newWallet);
  };

const GenerateKeyUtil: FC = () => {
  const addNewWallet = useOnboardingState((s) => s.addNewWallet);
  const setCurrentWallet = useOnboardingState((s) => s.setCurrentWallet);
  const setCurrentWalletAlias = useOnboardingState(
    (s) => s.setCurrentWalletAlias
  );
  const currentWallet = useOnboardingState((s) => s.currentWallet);
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
        Generate new key
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
          overflow="scroll"
        >
          <Typography variant="h6" component="h2">
            Your new key
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
              label="Set a name for your key:"
              value={alias}
              onChange={(e) => setAlias(e.currentTarget.value)}
            />
            <KeyField label="Public address" value={currentWallet.address} />
            <KeyField label="Private key" value={currentWallet.privateKey} />
            <KeyField
              label="Secret mnemonic phrase"
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
            Create key
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};

export default observer(GenerateKeyUtil);
