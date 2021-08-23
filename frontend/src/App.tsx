import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";

import lightTheme from "./components/Theme";
import { ThemeProvider } from "@material-ui/core";
import SearchAppBar from "./components/SearchAppBar";
import TopFabs from "./components/BottomFabs";
import GraphCanvas from "./components/Graph";
import BottomAppBar from "./components/BottomAppBar";

import db from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import graphDataTransformer from "./utils/graphDataTransformer";

import filterNodesData from "./utils/filterNodesData";

function App() {
  const isMounted = useRef<boolean | null>(null);

  // App Settings
  const [theme, setTheme] = useState(lightTheme);
  const [hideUI, setHideUI] = useState(false);
  const [selectedNode, setSelectedNode] = useState("");

  const toggleHideUI = () => {
    console.log("Clicked");
    setHideUI(!hideUI);
  };

  // Graph State
  const [network, setNetwork] = useState<any | null>(null);
  const [skillsData, setSkillData] = useState<Map<string, any>>(new Map());
  const [graph, setGraph] = useState<any>(null);
  const [focusedNode, setFocusedNode] = useState("Origin");

  // App Bar State
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("rendered");
    isMounted.current = true;
    const unsub = onSnapshot(collection(db, "nodes"), (querySnapshot) => {
      const skills: Map<string, any> = new Map();
      querySnapshot.forEach((doc) => {
        skills.set(doc.id, doc.data());
      });
      if (isMounted.current) {
        setSkillData(skills);
        validateSearch(skills);
      }
    });

    return () => {
      unsub();
      isMounted.current = false;
    };
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateSearch(skillsData);
  };

  const validateSearch = (data: Map<string, any>) => {
    const skillsArr = Array.from(data.values());
    if (search === "") {
      setFocusedNode("Origin");
      setGraph(graphDataTransformer(skillsArr));
    } else if (data.get(search)) {
      const originEdge = {
        from: "Origin",
        to: search,
      };
      const newGraph = graphDataTransformer(filterNodesData(skillsArr, search));
      if (!newGraph.edges.includes(originEdge)) {
        newGraph.edges.push(originEdge);
      }
      setFocusedNode(search);
      setGraph(newGraph);
    }
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SearchAppBar
          hideUI={hideUI}
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
        <TopFabs network={network} toggleHideUI={toggleHideUI} />
        <GraphCanvas
          graph={graph}
          network={network}
          focusedNode={focusedNode}
          setNetwork={setNetwork}
          setSelectedNode={setSelectedNode}
        />
        <BottomAppBar
          hideUI={hideUI}
          selectedNode={selectedNode}
          skillsData={skillsData}
          setFocusedNode={setFocusedNode}
          setGraph={setGraph}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;

// useEffect(() => {
//   console.log("SelectedNode", selectedNode);
// }, [selectedNode]);
// useEffect(() => {
//   console.log("HideUI", hideUI);
// }, [hideUI]);
// useEffect(() => {
//   console.log("Search", search);
// }, [search]);
