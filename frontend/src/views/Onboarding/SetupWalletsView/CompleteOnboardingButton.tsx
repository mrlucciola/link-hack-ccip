import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
// style
import { Button } from "@mui/material";
import { useViewStore } from "../../../mobx/stores";

/** ### Conclude the onboarding process
 * Changes the root-curentRootView state to `base`
 *
 * @todo add state to handle validation checks for enabling the button
 */
const CompleteOnboardingButton: FC = () => {
  const setCurrentRootView = useViewStore((s) => s.setCurrentRootView);

  return (
    <Button
      variant="contained"
      sx={{ m: 1 }}
      onClick={() => setCurrentRootView("base")}
      // @todo add state to handle validation checks for enabling the button
      // disabled
    >
      Complete setup
    </Button>
  );
};

export default observer(CompleteOnboardingButton);
