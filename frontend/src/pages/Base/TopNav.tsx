import { FC } from "react";
// mui
import { Grid } from "@mui/material";

const TopNav: FC = () => {
  return (
    <Grid
      item
      container
      flexDirection="row"
      height={40}
      sx={{ background: "red" }}
    ></Grid>
  );
};

export default TopNav;
