import { FC } from "react";
// style
import Grid from "@mui/material/Unstable_Grid2";
import GridPropsNamespace from "@mui/material/Unstable_Grid2/Grid2Props";

type GridProps = GridPropsNamespace.Grid2Props;

const BodyLayout: FC<GridProps> = ({ children, ...props }) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      minWidth="100%"
      maxWidth="100%"
      width="100%"
      flexWrap="wrap"
      flexGrow={1}
      overflow="scroll"
      p="2em"
      {...props}
    >
      {children}
    </Grid>
  );
};

export default BodyLayout;
