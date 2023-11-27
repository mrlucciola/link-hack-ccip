import { FC } from "react";
// mui
import Grid from "@mui/material/Unstable_Grid2";

import { useState } from "react";
import chainlinkLogo from "./assets/Chainlink.svg";
import "./App.css";

const App: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="title">
        <a href="https://react.dev" target="_blank">
          <img
            src={chainlinkLogo}
            className="logo chainlink"
            alt="Chainlink logo"
          />
        </a>
        <span>CCIP Wallet</span>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <Grid
        className="App"
        container
        direction="column"
        alignItems="center"
        wrap="nowrap"
      >
        MUI GRID App
      </Grid>
    </>
  );
};

export default App;
