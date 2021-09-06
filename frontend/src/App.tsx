/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
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
import { ModalData, GraphData, ErrorData, ScreenData, Skill } from "./Types";

function App() {
  const isMounted = useRef<boolean | null>(null);

  // App Settings
  const [theme, setTheme] = useState(darkTheme);
  const [screen, setScreen] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    orientation: "",
  } as ScreenData);
  const [loading, setLoading] = useState(true);
  const [hideUI, setHideUI] = useState(false);

  const toggleHideUI = () => {
    setHideUI((val: boolean) => !val);
  };

  // Graph State
  const [network, setNetwork] = useState<any | null>(null);
  const [skillsData, setSkillData] = useState<Map<string, Skill>>(new Map());
  const [graphData, setGraphData] = useState<GraphData>({
    graph: graphDataTransformer([], "normal"),
    graphName: "Knowledge Network",
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

  const handleSetScreen = useCallback(() => {
    if (window.innerWidth > window.innerHeight) {
      setScreen((data) => {
        return {
          width: window.innerWidth,
          height: window.innerHeight,
          orientation: "Landscape",
        };
      });
    } else if (window.innerWidth <= window.innerHeight) {
      setScreen((data) => {
        return {
          width: window.innerWidth,
          height: window.innerHeight,
          orientation: "Potrait",
        };
      });
    } else {
      setScreen((data) => {
        return {
          ...data,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      });
    }
  }, []);

  const debouncedHandleResize = debounce(() => {
    handleSetScreen();
  }, 250);

  useEffect(() => {
    isMounted.current = true;
    window.addEventListener("resize", debouncedHandleResize);
    const unsub = onSnapshot(collection(db, "nodes"), (querySnapshot) => {
      const skills: Map<string, Skill> = new Map();
      querySnapshot.forEach((doc) => {
        skills.set(doc.id, doc.data() as Skill);
      });
      if (isMounted.current) {
        handleSetScreen();
        setSkillData(skills);
      }
    });

    return () => {
      unsub();
      window.removeEventListener("resize", debouncedHandleResize);
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (skillsData.size === 0) return;
    validateSearch();
    if (loading) {
      setLoading(false);
    }
  }, [skillsData]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch("");
    validateSearch();
  };

  const validateSearch = useCallback(() => {
    const graphName = graphData.graphName;
    const skillsArr = Array.from(skillsData.values());
    const learntSkills = skillsArr.filter((skill) => skill.usedFrequency !== 0);
    let dataArr: any[] = [];
    if (graphName === "Knowledge Network") {
      dataArr = learntSkills;
    } else {
      dataArr = skillsArr;
    }

    if (search === "") {
      setGraphData((data: GraphData) => {
        return {
          ...data,
          graph: graphDataTransformer(dataArr, "normal"),
        };
      });
    } else if (skillsData.get(search)) {
      const originEdge = {
        from: "Origin",
        to: search,
        width: 1.5,
        arrowStrikethrough: false,
      };
      const newGraph = graphDataTransformer(
        filterNodesData(dataArr, search),
        "normal"
      );
      if (!newGraph.edges.includes(originEdge)) {
        newGraph.edges.push(originEdge);
      }
      setGraphData((data: GraphData) => {
        return {
          ...data,
          focusedNode: search,
          graph: newGraph,
        };
      });
    }
  }, [graphData.graphName, skillsData, search]);

  const memoTopAppBar = useMemo(() => {
    return (
      <SearchAppBar
        hideUI={hideUI}
        search={search}
        graphName={graphData.graphName}
        skillsData={skillsData}
        setSearch={setSearch}
        handleSearch={handleSearch}
        setGraphData={setGraphData}
      />
    );
  }, [hideUI, search, graphData.graphName, handleSearch, skillsData]);

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
        screen={screen}
        loading={loading}
        graph={graphData.graph}
        network={network}
        skillsData={skillsData}
        setNetwork={setNetwork}
        setModalData={setModalData}
        setErrorData={setErrorData}
      />
    );
  }, [graphData, network, theme, screen, loading]);

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
    setHideUI(screen.orientation === "Landscape" && window.innerHeight < 500);
  }, [screen]);

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
