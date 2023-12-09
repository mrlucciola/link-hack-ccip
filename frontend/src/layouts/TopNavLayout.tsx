import { FC } from "react";
// style
import Grid from "@mui/material/Unstable_Grid2";
import GridPropsNamespace from "@mui/material/Unstable_Grid2/Grid2Props";
import Paper, { PaperProps } from "@mui/material/Paper";

type GridProps = GridPropsNamespace.Grid2Props;

export const defaultNavHeight = 40;

const TopNavLayout: FC<GridProps & PaperProps> = ({ children, ...props }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      height={defaultNavHeight}
      minHeight={defaultNavHeight}
      maxHeight={defaultNavHeight}
      borderRadius={0}
      component={Paper}
      elevation={1}
      {...props}
    >
      {children}
    </Grid>
  );
};

export default TopNavLayout;
