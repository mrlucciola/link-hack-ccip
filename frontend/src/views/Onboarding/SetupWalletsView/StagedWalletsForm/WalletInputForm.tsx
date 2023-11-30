import { FC, useEffect } from "react";
// state
import { observer } from "mobx-react-lite";
import { useOnboardingStore } from "../../../../mobx/stores";
// style
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Badge, IconButton, Paper, TextField } from "@mui/material";
import { MdCancel } from "react-icons/md";

const AliasField: FC<{ walletIdx: number }> = observer(({ walletIdx }) => {
  const setWalletAliasByIdx = useOnboardingStore((s) => s.setWalletAliasByIdx);
  const wallet = useOnboardingStore((s) => s.wallets)[walletIdx];

  return (
    <TextField
      size="small"
      variant="filled"
      margin="none"
      label="Wallet name"
      value={wallet.alias}
      fullWidth
      InputLabelProps={{ shrink: true }}
      onChange={(e) => setWalletAliasByIdx(walletIdx, e.currentTarget.value)}
    />
  );
});

/**
 * @todo add proper validation and move to state
 */
const validateMnemonic = (testMnemonic: string) => {
  return testMnemonic.split(" ").length === 12;
};

/** ### Field to edit wallet mnemonic
 * @todo add mnemonic validation in state since we will be doing validation there
 */
const MnemonicField: FC<{ walletIdx: number }> = observer(({ walletIdx }) => {
  const setWalletMnemonicByIdx = useOnboardingStore(
    (s) => s.setWalletMnemonicByIdx
  );
  const setWalletWithMnemonicByIdx = useOnboardingStore(
    (s) => s.setWalletWithMnemonicByIdx
  );
  const wallet = useOnboardingStore((s) => s.wallets)[walletIdx];

  useEffect(() => {
    console.log("runnin");
    let timeoutId: null | ReturnType<typeof setTimeout> = null;

    if (validateMnemonic(wallet.mnemonic!.phrase) === true) {
      timeoutId = setTimeout(
        () => setWalletWithMnemonicByIdx(walletIdx, wallet.mnemonic!.phrase),
        1000
      );
    }

    // Effect clean-up
    return () => clearTimeout(timeoutId as NodeJS.Timeout);
  }, [wallet.mnemonic!.phrase]);

  return (
    <TextField
      size="small"
      variant="filled"
      margin="none"
      fullWidth
      label="Wallet secret mnemonic (a.k.a. seed phrase)"
      InputLabelProps={{ shrink: true }}
      value={wallet.mnemonic!.phrase}
      onChange={(e) => setWalletMnemonicByIdx(walletIdx, e.currentTarget.value)}
      // @todo add mnemonic validation handling
      // error
    />
  );
});

/** ### Display component for inputting wallet/key info
 *
 * 1. Text field - phrase/key
 * 1. Text field - alias
 * 1. Button - remove wallet
 */
const WalletInputForm: FC<{ walletIdx: number }> = ({ walletIdx }) => {
  const removeWalletByIdx = useOnboardingStore((s) => s.removeWalletByIdx);

  return (
    <Grid container direction="column" p={1} component={Paper}>
      <Badge
        badgeContent={
          <IconButton color="error" size="small">
            <MdCancel />
          </IconButton>
        }
        onClick={() => removeWalletByIdx(walletIdx)}
      />
      <AliasField walletIdx={walletIdx} />
      <MnemonicField walletIdx={walletIdx} />
    </Grid>
  );
};

export default WalletInputForm;
