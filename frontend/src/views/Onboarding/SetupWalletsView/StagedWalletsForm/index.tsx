import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useOnboardingStore } from "../../../../mobx/stores";
// style
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button } from "@mui/material";
// components
import WalletInputForm from "./WalletInputForm";
// interfaces
import { UserWallet } from "../../interfaces";

/** ### Display list of wallet forms
 *
 * Each item in the wallet list is rendered using a WalletInputForm
 *
 * Provide a blank field if wallet list is empty
 * @todo add local state in `GenerateWalletUtil` which disables the mnemonic field in walletinputform
 */
const WalletList: FC = observer(() => {
  const wallets = useOnboardingStore((s) => s.wallets);
  const walletList = wallets.map((w, idx) => (
    <WalletInputForm walletIdx={idx} key={`${w.address}${idx}`} />
  ));

  return <Grid>{walletList}</Grid>;
});

/** ### Add new wallet-form to the list of staged wallets
 */
const AddWalletButton: FC = () => {
  const addNewWallet = useOnboardingStore((s) => s.addNewWallet);
  // event handler
  const clickAddBlankWallet = () => {
    const newBlankWallet = {
      alias: "",
      mnemonic: { phrase: "" },
      // @todo avoid this - consider adding `id` field to serve as a react component key
      address: crypto.randomUUID(),
    } as UserWallet;

    addNewWallet(newBlankWallet);
  };

  return (
    <Button fullWidth variant="contained" onClick={clickAddBlankWallet}>
      Add wallet
    </Button>
  );
};

/** ### Stores list of generated wallets as well as inputted wallets.
 * User should be able to add their own wallets as well as generate new ones.
 *
 * @note add ability to add private keys as well
 *
 */
const StagedWalletsForm: FC = () => {
  return (
    <Grid p={1}>
      <WalletList />
      <AddWalletButton />
    </Grid>
  );
};

export default StagedWalletsForm;
