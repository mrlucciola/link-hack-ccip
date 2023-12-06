import ReactDOM from "react-dom/client";
// mui
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { lightTheme } from "./mui/theme";

// state
import { StoreProvider } from "./mobx/provider";
// components
import App from "./App.tsx";
// style
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <StoreProvider>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StoreProvider>
  // </React.StrictMode>
);
