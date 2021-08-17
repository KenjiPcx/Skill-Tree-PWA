import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./components/theme";
import { ThemeProvider } from "@material-ui/core";
import SearchAppBar from "./components/SearchAppBar";
import BottomAppBar from "./components/BottomAppBar";
import GraphCanvas from "./components/graph";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SearchAppBar />
        <GraphCanvas />
        <BottomAppBar />
      </ThemeProvider>
    </div>
  );
}

export default App;
