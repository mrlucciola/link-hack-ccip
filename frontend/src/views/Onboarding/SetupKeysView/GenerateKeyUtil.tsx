import { FC } from "react";
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button } from "@mui/material";

const GenerateKeyUtil: FC = () => {
  return (
    <Grid sx={{ background: "green" }} p={1}>
      <Button variant="contained" fullWidth>
        Generate new key
      </Button>
    </Grid>
  );
};

export default GenerateKeyUtil;
