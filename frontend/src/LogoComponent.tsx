import { FC } from "react";
// mui
import { Link, Typography, Unstable_Grid2 as Grid } from "@mui/material";
// img
import chainlinkLogo from "./assets/Chainlink.svg";

const LogoComponent: FC = () => {
  return (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
        fontWeight: 700,
      }}
    >
      <Link
        href="https://react.dev"
        target="_blank"
        sx={{
          "&:hover": {
            filter: "drop-shadow(0 0 2em #646cffaa)",
            // filter: "drop-shadow(0 0 2em #61dafbaa)",
          },
        }}
      >
        <img
          src={chainlinkLogo}
          alt="Chainlink logo"
          style={{
            height: "6em",
            padding: "1.5em",
            willChange: "filter",
            transition: "filter 300ms",
          }}
        />
      </Link>
      <Typography component="span">CCIP Wallet</Typography>
    </Grid>
  );
};

export default LogoComponent;