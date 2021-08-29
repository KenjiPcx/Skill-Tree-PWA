import React, { useState, useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Theme } from "@material-ui/core/styles";

import { ModalData } from "../App";
import ModalUpdateForm from "./NodeModalData/ModalUpdateForm";
import ModalAddForm from "./NodeModalData/ModalAddForm";
import ModalDeleteNode from "./NodeModalData/ModalDeleteNode";

interface NodeOptionModalsProps {
  theme: Theme;
  selectedNode: string;
  type: string;
  openModal: boolean;
  skillsData: Map<string, any>;
  setModalData: React.Dispatch<React.SetStateAction<ModalData>>;
}

function NodeOptionModals({
  theme,
  selectedNode,
  type,
  openModal,
  skillsData,
  setModalData,
}: NodeOptionModalsProps) {
  console.log("Render", selectedNode);

  const handleCloseModal = () =>
    setModalData((data) => {
      return {
        ...data,
        openModal: false,
      };
    });

  const modalData = () => {
    switch (type) {
      case "delete":
        return (
          <ModalDeleteNode
            selectedNode={selectedNode}
            handleCloseModal={handleCloseModal}
          />
        );

      case "add":
        return (
          <ModalAddForm
            selectedNode={selectedNode}
            handleCloseModal={handleCloseModal}
          />
        );

      case "edit":
        return (
          <ModalUpdateForm
            selectedNode={selectedNode}
            handleCloseModal={handleCloseModal}
          />
        );

      case "info":
        const skillData = skillsData.get(selectedNode);
        // console.log(skillData)
        return (
          <>
            <Typography variant="h5" component="h5" sx={{ fontWeight: "bold" }}>
              Node Info
            </Typography>
          </>
        );

      default:
        return <Container>Default</Container>;
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "75%",
            bgcolor: theme.palette.background.paper,
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
          }}
        >
          {modalData()}
        </Box>
      </Fade>
    </Modal>
  );
}

export default NodeOptionModals;
