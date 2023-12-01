import { FC } from "react";
// style
import Grid from "@mui/material/Unstable_Grid2";
import GridPropsNamespace from "@mui/material/Unstable_Grid2/Grid2Props";

type GridProps = GridPropsNamespace.Grid2Props;

const TopNav: FC<GridProps> = ({ children, ...props }) => {
  return (
    <Grid container direction="row" height={40} {...props}>
      {children}
    </Grid>
  );
};

export default TopNav;
