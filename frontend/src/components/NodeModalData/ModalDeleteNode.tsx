import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { deleteNode } from "../../firebase";

interface ModalDeleteNodeProps {
  selectedNode: string;
  handleCloseModal: () => void;
}

function ModalDeleteNode({
  selectedNode,
  handleCloseModal,
}: ModalDeleteNodeProps) {
  const handleDeleteNode = () => {
    deleteNode(selectedNode)
      .then(() => {
        handleCloseModal();
      })
      .catch(console.log);
  };

  return (
    <>
      <Typography
        id="transition-modal-title"
        variant="h5"
        component="h5"
        sx={{ fontWeight: "bold" }}
      >
        Delete Node
      </Typography>
      <Typography variant="h6" id="transition-modal-description" sx={{ my: 1 }}>
        Permanently Delete Node [{selectedNode}]?
      </Typography>
      <Typography variant="subtitle2" color="red">
        Children of this node will be orphaned.
      </Typography>
      <Typography variant="subtitle2" color="red">
        This cannot be undone.
      </Typography>
      <Container
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          disableElevation
          color="error"
          size="large"
          onClick={handleDeleteNode}
        >
          Delete
        </Button>
      </Container>
    </>
  );
}

export default ModalDeleteNode;
