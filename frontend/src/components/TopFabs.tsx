import React, { useState } from "react";
import { styled } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import Tooltip from "@material-ui/core/Tooltip";

interface TopFacsProps {
  network: any;
}

const TopFabs = ({ network }: TopFacsProps) => {
  const fabSpacing = "15px";
  const StyledFabsContainer = styled("div")({
    position: "absolute",
    zIndex: 1,
    top: 70,
    right: 12,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
  });

  const handleClick = () => {
    console.log("Clicked");
  };

  return (
    <StyledFabsContainer>
      <Tooltip title="Recenter">
        <Fab
          size="small"
          color="secondary"
          sx={{ mb: fabSpacing }}
          aria-label="Recenter"
          onClick={handleClick}
        >
          <GpsFixedIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Zoom In">
        <Fab
          size="small"
          color="secondary"
          sx={{ mb: fabSpacing }}
          aria-label="Zoom In"
          onClick={handleClick}
        >
          <ZoomInIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Zoom Out">
        <Fab
          size="small"
          color="secondary"
          sx={{ mb: fabSpacing }}
          aria-label="Zoom Out"
          onClick={handleClick}
        >
          <ZoomOutIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Toggle App Bars">
        <Fab
          size="small"
          color="secondary"
          sx={{ mb: fabSpacing }}
          aria-label="Toggle App Bars"
          onClick={handleClick}
        >
          <VisibilityOffIcon />
        </Fab>
      </Tooltip>
    </StyledFabsContainer>
  );
};

export default TopFabs;
