import { FC } from "react";
// mui
import Grid from "@mui/material/Unstable_Grid2";

// components
import LogoComponent from "./LogoComponent";

const App: FC = () => {  
  return (
    <Grid
    sx={{
      textAlign: "center",
      padding: "2rem",
      width: 320,
      height: 430,
      margin: "0 auto",
    }}
  >
    <LogoComponent />
    <Grid
      className="App"
      container
      direction="column"
      alignItems="center"
      wrap="nowrap"
    >      
      MUI GRID App L
    </Grid>  
  </Grid>
  );
};

export default App;
