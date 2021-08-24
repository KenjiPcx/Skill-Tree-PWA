import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";

import { lightTheme } from "./components/Theme";
import { IconButton, ThemeProvider } from "@material-ui/core";
import SearchAppBar from "./components/SearchAppBar";
import GraphCanvas from "./components/Graph";
import BottomAppBar from "./components/BottomAppBar";
import SpeedDial from "./components/SpeedDial";
import ErrorSnackBar from "./components/ErrorSnackBar";

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
  const [showError, setShowError] = useState(false);

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
    setSearch("");
    validateSearch(skillsData);
  };

  const validateSearch = (data: Map<string, any>) => {
    const skillsArr = Array.from(data.values());
    const learntSkills = skillsArr.filter((skill) => !skill.learning);
    if (search === "") {
      setFocusedNode("Origin");
      setGraph(graphDataTransformer(learntSkills));
    } else if (data.get(search) && !data.get(search).learning) {
      const originEdge = {
        from: "Origin",
        to: search,
        width: 1.5,
        arrowStrikethrough: false,
      };
      const newGraph = graphDataTransformer(
        filterNodesData(learntSkills, search)
      );
      if (!newGraph.edges.includes(originEdge)) {
        newGraph.edges.push(originEdge);
      }
      setFocusedNode(search);
      setGraph(newGraph);
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    console.log("HideUI", hideUI);
  }, [hideUI]);

  useEffect(() => {
    console.log("SelectedNode", selectedNode);
  }, [selectedNode]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SearchAppBar
          hideUI={hideUI}
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          setGraph={setGraph}
          setFocusedNode={setFocusedNode}
        />
        <ErrorSnackBar showError={showError} setShowError={setShowError} />
        <GraphCanvas
          theme={theme}
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
        <SpeedDial
          network={network}
          hideUI={hideUI}
          toggleHideUI={toggleHideUI}
          theme={theme}
          setTheme={setTheme}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;

// useEffect(() => {
//   console.log("Search", search);
// }, [search]);
