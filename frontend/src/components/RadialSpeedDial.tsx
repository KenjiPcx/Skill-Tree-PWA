import React, { useState } from "react";
import { styled } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";

import { useSpring, animated } from "react-spring";

const RadialSpeedDial = () => {
  const [showSpeedDial, setShowSpeedDial] = useState(false);

  const toggleSpeedDial = () => {
    setShowSpeedDial(!showSpeedDial);
  };

  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 10,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  });

  const NotchMargin = styled("div")({
    width: "70px",
    height: "35px",
    position: "absolute",
    zIndex: 1,
    top: -2,
    left: 0,
    right: 0,
    margin: "0 auto",
    backgroundColor: "#FFFFFF",
    borderRadius: "0 0 35px 35px",
  });

  const yOffset = 28;
  const xOffset = yOffset * 1.73;
  const AnimatedFab = animated(StyledFab);
  const leftFabTranslation = useSpring({
    transform: showSpeedDial
      ? `translate(-${xOffset}px, -${yOffset}px)`
      : "translate(0px, 0px)",
  });
  const middleFabTranslation = useSpring({
    transform: showSpeedDial
      ? `translate(-${0}px, -${Math.sqrt(xOffset ** 2 + yOffset ** 2)}px)`
      : "translate(0px, 0px)",
  });
  const rightFabTranslation = useSpring({
    transform: showSpeedDial
      ? `translate(${xOffset}px, -${yOffset}px)`
      : "translate(0px, 0px)",
  });
  const mainFabRotation = useSpring({
    transform: showSpeedDial ? `rotate(225deg)` : "rotate(0deg)",
  });

  return (
    <>
      <Tooltip title="Remove Node">
        <AnimatedFab
          size="small"
          style={leftFabTranslation}
          color="secondary"
          aria-label="Remove Node"
          onClick={() => console.log(yOffset)}
        >
          <DeleteForeverIcon />
        </AnimatedFab>
      </Tooltip>

      <Tooltip title="Add Child Node">
        <AnimatedFab
          size="small"
          style={middleFabTranslation}
          color="secondary"
          aria-label="Add Child Node"
          onClick={() => console.log("Clicked2")}
        >
          <AddCircleOutlineIcon />
        </AnimatedFab>
      </Tooltip>

      <Tooltip title="Edit Node">
        <AnimatedFab
          size="small"
          style={rightFabTranslation}
          color="secondary"
          aria-label="Edit Node"
          onClick={() => console.log("Clicked3")}
        >
          <EditIcon />
        </AnimatedFab>
      </Tooltip>

      <NotchMargin />

      <Tooltip title="Node Options">
        <AnimatedFab
          style={mainFabRotation}
          color="secondary"
          aria-label="Toggle Node Options"
          onClick={() => toggleSpeedDial()}
        >
          <AddIcon fontSize="large" />
        </AnimatedFab>
      </Tooltip>
    </>
  );
};

export default RadialSpeedDial;
