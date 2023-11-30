import { FC } from "react";
// mui
import { Button } from "@mui/material";

/** ## Conclude the onboarding process
 * Changes the root-curentRootView state to `base`
 */
const CompleteOnboardingButton: FC = () => {
  return (
    <Button variant="contained" sx={{ m: 1 }} fullWidth>
      Complete setup
    </Button>
  );
};

export default CompleteOnboardingButton;
