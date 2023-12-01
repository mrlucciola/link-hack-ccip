import { FC } from "react";
// style
import Grid from "@mui/material/Unstable_Grid2";
import Grid2PropsNamespace from "@mui/material/Unstable_Grid2/Grid2Props";

type Grid2Props = Grid2PropsNamespace.Grid2Props;

const RootLayout: FC<Grid2Props> = ({ children, ...props }) => {
  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="flex-start"
      minWidth="100%"
      maxWidth="100%"
      width="100%"
      minHeight="100%"
      maxHeight="100%"
      height="100%"
      wrap="nowrap"
      {...props}
    >
      {children}
    </Grid>
  );
};

export default RootLayout;
