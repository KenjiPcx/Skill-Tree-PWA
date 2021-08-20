import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "./components/Theme";
import { ThemeProvider } from "@material-ui/core";
import SearchAppBar from "./components/SearchAppBar";
import TopFabs from "./components/TopFabs";
import GraphCanvas from "./components/Graph";
import BottomAppBar from "./components/BottomAppBar";

import db from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import GraphDataTransformer from "./components/GraphDataTransformer";

function App() {
  const isMounted = useRef<boolean | null>(null);

  // Graph State
  const [network, setNetwork] = useState<any | null>(null);
  const [graph, setGraph] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState("");

  // App Bar State
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("rendered");
    isMounted.current = true;
    const unsub = onSnapshot(collection(db, "nodes"), (querySnapshot) => {
      const skills: any[] = [];
      querySnapshot.forEach((doc) => {
        skills.push({ id: doc.id, ...doc.data() });
      });
      if (isMounted) setGraph(GraphDataTransformer(skills));
      console.log("redrew");
    });

    return () => {
      unsub();
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    console.log("SelectedNode", selectedNode);
  }, [selectedNode]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SearchAppBar search={search} setSearch={setSearch} />
        <TopFabs network={network} />
        <GraphCanvas
          graph={graph}
          network={network}
          setNetwork={setNetwork}
          setSelectedNode={setSelectedNode}
        />
        <BottomAppBar selectedNode={selectedNode} />
      </ThemeProvider>
    </div>
  );
}

export default App;
