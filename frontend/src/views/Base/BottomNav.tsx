import { FC } from "react";
// style
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";

const BottomNav: FC = () => {
  return (
    <Grid
      container
      direction="row"
      component={Paper}
      height={50}
      minHeight={50}
      maxHeight={50}
    ></Grid>
  );
};

export default BottomNav;
