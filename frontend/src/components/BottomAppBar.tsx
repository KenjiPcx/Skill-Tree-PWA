import React from "react";

// Components
import RadialSpeedDial from "./RadialSpeedDial";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import BarChartIcon from "@material-ui/icons/BarChart";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from "@material-ui/icons/Settings";
import Tooltip from "@material-ui/core/Tooltip";
import { useSpring, animated } from "react-spring";
import { styled } from "@material-ui/core/styles";

// Graph Data
import graphDataTransformer from "../utils/graphDataTransformer";
import generateStatsNodes from "../utils/generateStatsNodes";
interface BottomAppBarProps {
  hideUI: boolean;
  selectedNode: any;
  skillsData: Map<string, any>;
  setFocusedNode: React.Dispatch<React.SetStateAction<string>>;
  setGraph: React.Dispatch<any>;
}

const AnimatedAppBar = animated(AppBar);

const NotchMargin = styled("div")({
  width: "70px",
  height: "35px",
  position: "absolute",
  zIndex: 1,
  top: 0,
  left: 0,
  right: 0,
  margin: "0 auto",
  backgroundColor: "#FFFFFF",
  borderRadius: "0 0 35px 35px",
});

export default function BottomAppBar({
  hideUI,
  selectedNode,
  skillsData,
  setFocusedNode,
  setGraph,
}: BottomAppBarProps) {
  const botTranslation = useSpring({
    transform: hideUI ? `translateY(100px)` : "translateY(0px)",
  });

  const resetInjections = () => {
    const skillsArr = Array.from(skillsData.values());
    setFocusedNode("Origin");
    setGraph(graphDataTransformer(skillsArr));
  };

  const handleInjectStats = () => {
    setGraph(generateStatsNodes(skillsData));
  };

  return (
    <>
      <AnimatedAppBar
        position="fixed"
        color="primary"
        sx={{ top: "auto", bottom: 0, zIndex: 1 }}
        style={botTranslation}
      >
        <Toolbar>
          <Tooltip title="Knowledge Network">
            <IconButton
              color="inherit"
              aria-label="Knowledge Network"
              onClick={resetInjections}
            >
              <BubbleChartIcon />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Learning Stats">
            <IconButton
              color="inherit"
              aria-label="Learning Stats"
              onClick={handleInjectStats}
            >
              <BarChartIcon />
            </IconButton>
          </Tooltip>
          <NotchMargin />
          <Box sx={{ flexGrow: 3 }} />
          <Tooltip title="Learning List">
            <IconButton color="inherit" aria-label="Learning List">
              <ListIcon />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Settings">
            <IconButton color="inherit" aria-label="Settings">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AnimatedAppBar>
      <RadialSpeedDial hideUI={hideUI} />
    </>
  );
}
