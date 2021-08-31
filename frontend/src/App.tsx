/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";

import debounce from "./utils/debounce";
import AuthProvider from "./components/AuthProvider";
import { darkTheme } from "./components/Theme";
import { ThemeProvider } from "@material-ui/core";
import SearchAppBar from "./components/SearchAppBar";
import GraphCanvas from "./components/Graph";
import BottomAppBar from "./components/BottomAppBar";
import SpeedDial from "./components/SpeedDial";
import ErrorSnackBar from "./components/ErrorSnackBar";
import NodeOptionModals from "./components/NodeOptionModals";

import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import graphDataTransformer from "./utils/graphDataTransformer";
import filterNodesData from "./utils/filterNodesData";

export interface ModalData {
  selectedNode: string;
  modalType: string;
  openModal: boolean;
  showSpeedDial: boolean;
}

export interface GraphData {
  graph: any;
  focusedNode: string;
}

export interface ErrorData {
  errorMsg: string;
  showError: boolean;
}

function App() {
  const isMounted = useRef<boolean | null>(null);

  // App Settings
  const [theme, setTheme] = useState(darkTheme);
  const [orientation, setOrientation] = useState("");
  const [hideUI, setHideUI] = useState(false);

  const toggleHideUI = () => {
    setHideUI((val: boolean) => !val);
  };

  // Graph State
  const [network, setNetwork] = useState<any | null>(null);
  const [skillsData, setSkillData] = useState<Map<string, any>>(new Map());
  const [graphData, setGraphData] = useState<GraphData>({
    graph: null,
    focusedNode: "Origin",
  });

  // App Bar State
  const [search, setSearch] = useState("");
  const [errorData, setErrorData] = useState<ErrorData>({
    errorMsg: "",
    showError: false,
  });

  // Modal State
  const [modalData, setModalData] = useState<ModalData>({
    selectedNode: "",
    modalType: "",
    openModal: false,
    showSpeedDial: false,
  });

  const handleSetOrientation = () => {
    if (window.innerWidth > window.innerHeight) {
      setOrientation("Landscape");
    }
    if (window.innerWidth < window.innerHeight) {
      setOrientation("Portrait");
    }
  };

  const debouncedHandleResize = debounce(() => {
    handleSetOrientation();
  }, 250);

  useEffect(() => {
    isMounted.current = true;
    window.addEventListener("resize", debouncedHandleResize);
    const unsub = onSnapshot(collection(db, "nodes"), (querySnapshot) => {
      const skills: Map<string, any> = new Map();
      querySnapshot.forEach((doc) => {
        skills.set(doc.id, doc.data());
      });
      if (isMounted.current) {
        handleSetOrientation();
        setSkillData(skills);
        validateSearch(skills);
      }
    });

    return () => {
      unsub();
      window.removeEventListener("resize", debouncedHandleResize);
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
      setGraphData((data: GraphData) => {
        return {
          ...data,
          graph: graphDataTransformer(learntSkills, "normal"),
        };
      });
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
      setGraphData((data: GraphData) => {
        return {
          focusedNode: search,
          graph: newGraph,
        };
      });
    } else {
      setErrorData((data: ErrorData) => {
        return {
          errorMsg: "No Result Found",
          showError: true,
        };
      });
    }
  };

  const memoTopAppBar = useMemo(() => {
    return (
      <SearchAppBar
        hideUI={hideUI}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        setGraphData={setGraphData}
      />
    );
  }, [hideUI, search]);

  const memoErrorSnackbar = useMemo(() => {
    return (
      <ErrorSnackBar
        errorMsg={errorData.errorMsg}
        showError={errorData.showError}
        setErrorData={setErrorData}
      />
    );
  }, [errorData]);

  const memoModals = useMemo(() => {
    return (
      <NodeOptionModals
        theme={theme}
        selectedNode={modalData.selectedNode}
        type={modalData.modalType}
        openModal={modalData.openModal}
        skillsData={skillsData}
        setModalData={setModalData}
      />
    );
  }, [modalData.openModal, theme]);

  const memoGraph = useMemo(() => {
    return (
      <GraphCanvas
        theme={theme}
        orientation={orientation}
        graph={graphData.graph}
        network={network}
        focusedNode={graphData.focusedNode}
        setNetwork={setNetwork}
        setModalData={setModalData}
        setErrorData={setErrorData}
      />
    );
  }, [graphData, network, theme, orientation]);

  const memoBottomAppBar = useMemo(() => {
    return (
      <BottomAppBar
        hideUI={hideUI}
        skillsData={skillsData}
        selectedNode={modalData.selectedNode}
        showSpeedDial={modalData.showSpeedDial}
        setGraphData={setGraphData}
        setModalData={setModalData}
        setErrorData={setErrorData}
      />
    );
  }, [hideUI, modalData, skillsData]);

  const memoSpeedDial = useMemo(() => {
    return (
      <SpeedDial
        network={network}
        hideUI={hideUI}
        toggleHideUI={toggleHideUI}
        theme={theme}
        setTheme={setTheme}
      />
    );
  }, [network, hideUI, theme]);

  useEffect(() => {
    setHideUI(orientation === "Landscape" && window.innerHeight < 500);
  }, [orientation]);

  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {memoTopAppBar}
          {memoErrorSnackbar}
          {memoModals}
          {memoGraph}
          {memoBottomAppBar}
          {memoSpeedDial}
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
