import { FC } from "react";
// mui
import { Grid } from "@mui/material";

const Body: FC = () => {
  return (
    <Grid
      item
      container
      flexDirection="column"
      flexWrap="wrap"
      flexGrow={1}
      p="2em"
      overflow="scroll"
    >
      body
    </Grid>
  );
};

export default Body;
