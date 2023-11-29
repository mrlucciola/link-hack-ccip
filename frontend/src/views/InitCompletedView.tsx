import { FC } from "react";
// mui
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";

const InitCompletedView: FC = () => {
  const text =
    "Setup complete. You may change your keys and accounts in Settings.";

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: "2rem",
        width: 320,
        height: 430,
      }}
    >
      <Typography variant="h5" component="h1" align="center">
        {text}
      </Typography>
    </Grid>
  );
};

export default InitCompletedView;
