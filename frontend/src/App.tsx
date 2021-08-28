import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";

import { lightTheme } from "./components/Theme";
import { ThemeProvider } from "@material-ui/core";
import SearchAppBar from "./components/SearchAppBar";
import GraphCanvas from "./components/Graph";
import BottomAppBar from "./components/BottomAppBar";
import SpeedDial from "./components/SpeedDial";
import ErrorSnackBar from "./components/ErrorSnackBar";
import NodeOptionModals from "./components/NodeOptionModals";

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
  const [showSpeedDial, setShowSpeedDial] = useState(false);

  const toggleSpeedDial = () => {
    setShowSpeedDial(!showSpeedDial);
  };

  // Modal State
  const [modalType, setModalType] = useState("");
  const [showNoNodeError, setShowNoNodeError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
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
      setGraph(graphDataTransformer(learntSkills, "normal"));
    } else if (data.get(search) && !data.get(search).learning) {
      const originEdge = {
        from: "Origin",
        to: search,
        width: 1.5,
        arrowStrikethrough: false,
      };
      const newGraph = graphDataTransformer(
        filterNodesData(learntSkills, search),
        "normal"
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
        <ErrorSnackBar
          key={"SearchError"}
          errorMsg={"No Node Found"}
          showError={showError}
          setShowError={setShowError}
        />
        <ErrorSnackBar
          key={"NoNodeError"}
          errorMsg={"No Node Selected"}
          showError={showNoNodeError}
          setShowError={setShowNoNodeError}
        />
        <NodeOptionModals
          theme={theme}
          selectedNode={selectedNode}
          type={modalType}
          openModal={openModal}
          skillsData={skillsData}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
        <GraphCanvas
          theme={theme}
          graph={graph}
          network={network}
          focusedNode={focusedNode}
          setNetwork={setNetwork}
          setShowSpeedDial={setShowSpeedDial}
          setSelectedNode={setSelectedNode}
        />
        <BottomAppBar
          hideUI={hideUI}
          selectedNode={selectedNode}
          skillsData={skillsData}
          showSpeedDial={showSpeedDial}
          setFocusedNode={setFocusedNode}
          setShowNoNodeError={setShowNoNodeError}
          setGraph={setGraph}
          setModalType={setModalType}
          handleOpenModal={handleOpenModal}
          toggleSpeedDial={toggleSpeedDial}
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
