import { FC } from "react";
// style
import Grid from "@mui/material/Unstable_Grid2";
import GridPropsNamespace from "@mui/material/Unstable_Grid2/Grid2Props";
import Paper from "@mui/material/Paper";

type GridProps = GridPropsNamespace.Grid2Props;

const TopNavLayout: FC<GridProps> = ({ children, ...props }) => {
  return (
    <Grid
      container
      direction="row"
      component={Paper}
      height={40}
      minHeight={40}
      maxHeight={40}
      {...props}
    >
      {children}
    </Grid>
  );
};

export default TopNavLayout;
