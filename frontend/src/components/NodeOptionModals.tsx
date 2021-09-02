import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Container from "@material-ui/core/Container";
import { Theme } from "@material-ui/core/styles";

import { ModalData, Skill } from "../Types";
import ModalUpdateForm from "./NodeModalData/ModalUpdateForm";
import ModalAddForm from "./NodeModalData/ModalAddForm";
import ModalDeleteNode from "./NodeModalData/ModalDeleteNode";
import ModalNodeInfo from "./NodeModalData/ModalNodeInfo";
import ModalOriginNode from "./NodeModalData/ModalOriginNode";

interface NodeOptionModalsProps {
  theme: Theme;
  selectedNode: string;
  type: string;
  openModal: boolean;
  skillsData: Map<string, Skill>;
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
            skillsData={skillsData}
            handleCloseModal={handleCloseModal}
          />
        );

      case "info":
        if (selectedNode === "Origin") {
          // return origin modal
          return <ModalOriginNode skillsData={skillsData} />;
        }
        return (
          <ModalNodeInfo
            selectedNode={selectedNode}
            skillsData={skillsData}
            handleCloseModal={handleCloseModal}
          />
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
      sx={{ maxWidth: "450px", m: "auto auto" }}
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
