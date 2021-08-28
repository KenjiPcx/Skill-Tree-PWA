import React, { useState } from "react";
import { styled } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";
import ErrorSnackBar from "./ErrorSnackBar";

import { useSpring, animated } from "react-spring";

const FabContainer = styled("div")({
  position: "absolute",
  zIndex: 10,
  top: 0,
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

const animationDuration = 250;
const yOffset = 30;
const xOffset = yOffset * 1.73;
const AnimatedFab = animated(StyledFab);
interface RadialSpeedDialProps {
  hideUI: boolean;
  showSpeedDial: boolean;
  selectedNode: string;
  setShowNoNodeError: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  handleOpenModal: () => void;
  toggleSpeedDial: () => void;
}

const RadialSpeedDial = ({
  hideUI,
  showSpeedDial,
  selectedNode,
  setShowNoNodeError,
  setModalType,
  handleOpenModal,
  toggleSpeedDial,
}: RadialSpeedDialProps) => {
  const leftFabTranslation = useSpring({
    config: { duration: animationDuration },
    opacity: showSpeedDial ? 1 : 0,
    transform: showSpeedDial
      ? `translate(-${xOffset}px, -${yOffset}px) scale(1)`
      : "translate(0px, 0px) scale(0)",
  });

  const middleFabTranslation = useSpring({
    config: { duration: animationDuration },
    opacity: showSpeedDial ? 1 : 0,
    transform: showSpeedDial
      ? `translate(-${0}px, -${Math.sqrt(
          xOffset ** 2 + yOffset ** 2
        )}px) scale(1)`
      : "translate(0px, 0px) scale(0)",
  });

  const rightFabTranslation = useSpring({
    config: { duration: animationDuration },
    opacity: showSpeedDial ? 1 : 0,
    transform: showSpeedDial
      ? `translate(${xOffset}px, -${yOffset}px) scale(1)`
      : "translate(0px, 0px) scale(0)",
  });

  const mainFabRotation = useSpring({
    config: { duration: animationDuration },
    transform: showSpeedDial ? `rotate(225deg)` : "rotate(0deg)",
  });

  const handleOpenDeleteModal = () => {
    if (selectedNode === "") {
      setShowNoNodeError(true);
    } else {
      setModalType("delete");
      handleOpenModal();
    }
  };

  const handleOpenAddModal = () => {
    if (selectedNode === "") {
      setShowNoNodeError(true);
    } else {
      setModalType("add");
      handleOpenModal();
    }
  };

  const handleOpenEditModal = () => {
    if (selectedNode === "") {
      setShowNoNodeError(true);
    } else {
      setModalType("edit");
      handleOpenModal();
    }
  };

  return (
    <FabContainer>
      <Tooltip title="Remove Node">
        <AnimatedFab
          size="small"
          style={leftFabTranslation}
          color="secondary"
          aria-label="Remove Node"
          onClick={handleOpenDeleteModal}
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
          onClick={handleOpenAddModal}
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
          onClick={handleOpenEditModal}
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
