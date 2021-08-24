import React, { useMemo } from "react";
import { styled } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/core/SpeedDial";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SpeedDialAction from "@material-ui/core/SpeedDialAction";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { useSpring, animated } from "react-spring";

interface SpeedDialProps {
  network: any;
  hideUI: boolean;
  toggleHideUI: () => void;
}

const AnimatedSpeedDial = animated(SpeedDial);

export default function LineSpeedDial({
  network,
  hideUI,
  toggleHideUI,
}: SpeedDialProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const botTranslation = useSpring({
    transform: hideUI ? `translateY(50px)` : "translateY(0px)",
  });

  const handleRecenter = () => {
    network.fit({
      nodes: ["Origin"],
      minZoomLevel: 0.5,
      maxZoomLevel: 1,
      animation: true,
    });
  };

  const toggleAppBars = () => {
    toggleHideUI();
    handleClose();
  };

  const handleGraphRecenter = () => {
    handleRecenter();
    handleClose();
  };

  const actions = [
    {
      icon: <VisibilityOffIcon />,
      name: "Toggle App Bar",
      onClick: toggleAppBars,
    },
    {
      icon: <Brightness4Icon />,
      name: "Toggle Theme",
      onClick: toggleAppBars,
    },
    {
      icon: <GpsFixedIcon />,
      name: "Recenter Graph",
      onClick: handleGraphRecenter,
    },
  ];

  return (
    <AnimatedSpeedDial
      ariaLabel="Toggle SpeedDial"
      sx={{ position: "absolute", bottom: 70, right: 8 }}
      icon={<VisibilityIcon />}
      FabProps={{ color: "secondary", size: "medium" }}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      style={botTranslation}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          FabProps={{ size: "small" }}
          sx={{
            backgroundColor: "#70EFDE !important",
            color: "#000000 !important",
          }}
          onClick={action.onClick}
        />
      ))}
    </AnimatedSpeedDial>
  );
}
