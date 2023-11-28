import { FC } from "react";
// mui
import Grid from "@mui/material/Unstable_Grid2";

const Body: FC = () => {
  return (
    <Grid
      container
      direction="column"
      flexWrap="wrap"
      flexGrow={1}
      overflow="scroll"
      p="2em"
    >
      body
    </Grid>
  );
};

export default Body;
