import React from "react";
import { styled } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import Tooltip from "@material-ui/core/Tooltip";

interface TopFacsProps {
  network: any;
  toggleHideUI: () => void;
}

const TopFabs = ({ network, toggleHideUI }: TopFacsProps) => {
  const handleClick = () => {
    console.log("Clicked");
  };

  const handleRecenter = () => {
    network.fit({
      nodes: ["Origin"],
      minZoomLevel: 0.5,
      maxZoomLevel: 1,
      animation: true,
    });
  };

  const fabSpacing = "15px";
  const StyledFabsContainer = styled("div")({
    position: "absolute",
    zIndex: 1,
    bottom: 70,
    right: 12,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
  });
  return (
    <StyledFabsContainer>
      <Tooltip title="Recenter">
        <Fab
          size="small"
          color="secondary"
          sx={{ mb: fabSpacing }}
          aria-label="Recenter"
          onClick={handleRecenter}
        >
          <GpsFixedIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Toggle App Bars">
        <Fab
          size="small"
          color="secondary"
          sx={{ mb: fabSpacing }}
          aria-label="Toggle App Bars"
          onClick={toggleHideUI}
        >
          <VisibilityOffIcon />
        </Fab>
      </Tooltip>
    </StyledFabsContainer>
  );
};

export default TopFabs;
