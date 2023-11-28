import { FC } from "react";
// mui
import Grid from "@mui/material/Unstable_Grid2";
import Base from "./pages/Base";

const App: FC = () => {
  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      wrap="nowrap"
      minHeight="100%"
      maxHeight="100%"
      height="100%"
    >
      {/* @note this nesting is unnecessary and will be conditionally rendered based on user-initiation state */}
      <Base />
    </Grid>
  );
};

export default App;
