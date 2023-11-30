import { FC } from "react";
// style
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, Button } from "@mui/material";

const SplashView: FC = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        textAlign: "center",
        width: 320,
        height: 430,
        margin: "0 auto",
        position: "relative", // Ajout de position relative ici
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          position: "absolute",
          top: "45%",
          transform: "translateY(-50%)",
        }}
      >
        Welcome to CCIP Wallet
      </Typography>
      <Grid sx={{ position: "absolute", bottom: "1.5rem", width: "90%" }}>
        <Button variant="contained" sx={{ width: "100%" }}>
          Get started
        </Button>
      </Grid>
    </Grid>
  );
};

export default SplashView;
