import React, { useState } from "react";
import { styled } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";

import { useSpring, animated } from "react-spring";

const FabContainer = styled("div")({
  position: "absolute",
  zIndex: 10,
  bottom: "6.5%",
  left: 0,
  right: 0,
  margin: "0 auto",
});

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 10,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto auto",
});

const yOffset = 30;
const xOffset = yOffset * 1.73;
const AnimatedFab = animated(StyledFab);
interface RadialSpeedDialProps {
  hideUI: boolean;
}

const RadialSpeedDial = ({ hideUI }: RadialSpeedDialProps) => {
  const [showSpeedDial, setShowSpeedDial] = useState(false);

  const toggleSpeedDial = () => {
    setShowSpeedDial(!showSpeedDial);
  };

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
    <FabContainer>
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
    </FabContainer>
  );
};

export default RadialSpeedDial;
