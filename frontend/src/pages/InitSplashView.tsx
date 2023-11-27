import { Grid, Typography, Button } from "@mui/material";

const InitSplashView = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "100%",
        minWidth: "100%",
        position: "relative",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        style={{
          position: "absolute",
          top: "45%",
          transform: "translateY(-50%)",
        }}
      >
        Welcome to CCIP Wallet
      </Typography>
      <Grid
        item
        style={{ position: "absolute", bottom: "1.5rem", width: "100%" }}
      >
        <Button variant="contained" style={{ width: "85%" }}>
          Get started
        </Button>
      </Grid>
    </Grid>
  );
};

export default InitSplashView;
