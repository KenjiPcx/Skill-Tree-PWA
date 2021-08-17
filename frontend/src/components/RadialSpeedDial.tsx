import React, { useState } from "react";
import { styled } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { useSpring, animated } from "react-spring";

const RadialSpeedDial = () => {
  const [showSpeedDial, setShowSpeedDial] = useState(false);

  const toggleSpeedDial = () => {
    console.log("Toggled Speed Dial");
    setShowSpeedDial(!showSpeedDial);
  };

  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
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
      <AnimatedFab
        size="small"
        style={leftFabTranslation}
        color="secondary"
        aria-label="add"
        className="SpeedDialBtn"
        onClick={() => console.log(yOffset)}
      >
        <AddIcon />
      </AnimatedFab>
      <AnimatedFab
        size="small"
        style={middleFabTranslation}
        color="secondary"
        aria-label="add"
        className="SpeedDialBtn"
        onClick={() => console.log("Clicked2")}
      >
        <AddIcon />
      </AnimatedFab>
      <AnimatedFab
        size="small"
        style={rightFabTranslation}
        color="secondary"
        aria-label="add"
        className="SpeedDialBtn"
        onClick={() => console.log("Clicked3")}
      >
        <AddIcon />
      </AnimatedFab>
      <AnimatedFab
        style={mainFabRotation}
        color="secondary"
        aria-label="add"
        onClick={() => toggleSpeedDial()}
      >
        <AddIcon />
      </AnimatedFab>
    </>
  );
};

export default RadialSpeedDial;
