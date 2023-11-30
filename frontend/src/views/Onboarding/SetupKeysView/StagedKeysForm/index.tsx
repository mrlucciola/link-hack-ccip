import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useOnboardingState } from "../../store";
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const KeyInputForm:FC = observer(() => {
  return <Grid>

  </Grid>
})

/**
 * Stores list of generated keys as well as inputted keys.
 * User should be able to 
 * 
 */
const StagedKeysForm: FC = () => {
  const wallets = useOnboardingState((s) => s.wallets);
  console.log("wallets", wallets.length);
  const walletList = wallets.map((w) => <div>{w.alias}</div>);

  return <Grid>

  </Grid>;
};

export default observer(StagedKeysForm);
