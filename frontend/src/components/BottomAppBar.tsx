import React, { useState } from "react";

// Components
import RadialSpeedDial from "./RadialSpeedDial";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import BarChartIcon from "@material-ui/icons/BarChart";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import TimelineIcon from "@material-ui/icons/Timeline";
import Tooltip from "@material-ui/core/Tooltip";
import { useSpring, animated } from "react-spring";
import { styled } from "@material-ui/core/styles";

// Graph Data
import graphDataTransformer from "../utils/graphDataTransformer";
import generateStatsNodes from "../utils/generateStatsNodes";
import generateTimelineNodes from "../utils/generateTimelineNodes";
interface BottomAppBarProps {
  hideUI: boolean;
  selectedNode: any;
  skillsData: Map<string, any>;
  setFocusedNode: React.Dispatch<React.SetStateAction<string>>;
  setGraph: React.Dispatch<any>;
}

const NotchMargin = styled("div")({
  width: "70px",
  height: "35px",
  position: "absolute",
  zIndex: 1,
  top: -1,
  left: 0,
  right: 0,
  margin: "0 auto",
  backgroundColor: "#FFFFFF",
  borderRadius: "0 0 35px 35px",
});

const AnimatedAppBar = animated(AppBar);

export default function BottomAppBar({
  hideUI,
  selectedNode,
  skillsData,
  setFocusedNode,
  setGraph,
}: BottomAppBarProps) {
  const botTranslation = useSpring({
    delay: hideUI ? 0 : 50,
    transform: hideUI ? `translateY(100px)` : "translateY(0px)",
  });

  const resetInjections = () => {
    const skillsArr = Array.from(skillsData.values());
    const learnedSkills = skillsArr.filter((skill) => !skill.learning);
    setFocusedNode("Origin");
    setGraph(graphDataTransformer(learnedSkills, "normal"));
  };

  const handleInjectStats = () => {
    setFocusedNode("Origin");
    setGraph(generateStatsNodes(skillsData));
  };

  const handleInjectLearningSkills = () => {
    const skillsArr = Array.from(skillsData.values());
    setFocusedNode("Origin");
    setGraph(graphDataTransformer(skillsArr, "normal"));
  };

  const handleInjectTimeline = () => {
    const graph = graphDataTransformer(
      generateTimelineNodes(skillsData),
      "timeline"
    );
    setGraph(graph);
  };

  return (
    <>
      <AnimatedAppBar
        position="fixed"
        color="primary"
        sx={{ top: "auto", bottom: 0, zIndex: 1 }}
        style={botTranslation}
      >
        <NotchMargin />
        <RadialSpeedDial hideUI={hideUI} />
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
          <Tooltip title="Learning List">
            <IconButton
              color="inherit"
              aria-label="Learning List"
              onClick={handleInjectLearningSkills}
            >
              <NewReleasesIcon />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 3 }} />
          <Tooltip title="Learning Stats">
            <IconButton
              color="inherit"
              aria-label="Learning Stats"
              onClick={handleInjectStats}
            >
              <BarChartIcon />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Timeline">
            <IconButton
              color="inherit"
              aria-label="Timeline"
              onClick={handleInjectTimeline}
            >
              <TimelineIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AnimatedAppBar>
    </>
  );
}
