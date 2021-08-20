import React from "react";
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

interface BottomAppBarProps {
  selectedNode: any;
}

export default function BottomAppBar({ selectedNode }: BottomAppBarProps) {
  return (
    <>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Tooltip title="Knowledge Network">
            <IconButton color="inherit" aria-label="Knowledge Network">
              <BubbleChartIcon />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Learning Stats">
            <IconButton color="inherit" aria-label="Learning Stats">
              <BarChartIcon />
            </IconButton>
          </Tooltip>
          <RadialSpeedDial />
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
      </AppBar>
    </>
  );
}
