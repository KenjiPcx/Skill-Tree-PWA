import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./components/Theme";
import { ThemeProvider } from "@material-ui/core";
import SearchAppBar from "./components/SearchAppBar";
import TopFabs from "./components/TopFabs";
import GraphCanvas from "./components/Graph";
import BottomAppBar from "./components/BottomAppBar";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SearchAppBar />
        <TopFabs />
        <GraphCanvas />
        <BottomAppBar />
      </ThemeProvider>
    </div>
  );
}

export default App;
