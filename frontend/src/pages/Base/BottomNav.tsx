import { FC } from "react";
// mui
import { Grid } from "@mui/material";

const BottomNav: FC = () => {
  return (
    <Grid
      item
      container
      flexDirection="row"
      height={40}
      sx={{ background: "blue" }}
    ></Grid>
  );
};

export default BottomNav;
