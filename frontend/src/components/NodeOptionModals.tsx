import React, { useState, useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { Theme } from "@material-ui/core/styles";
import { addNode, updateNode, deleteNode } from "../firebase";
import { update } from "react-spring";

interface NodeOptionModalsProps {
  theme: Theme;
  selectedNode: string;
  type: string;
  openModal: boolean;
  skillsData: Map<string, any>;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

const sx = {
  width: "100%",
  my: 1,
  borderRadius: "20px",
};

function NodeOptionModals({
  theme,
  selectedNode,
  type,
  openModal,
  skillsData,
  handleOpenModal,
  handleCloseModal,
}: NodeOptionModalsProps) {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [group, setGroup] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [yearStarted, setYearStarted] = useState("");
  const [usedFrequency, setUsedFrequency] = useState("");

  const resetForm = () => {
    setName("");
    setParent("");
    setGroup("");
    setImageURL("");
    setYearStarted("");
    setUsedFrequency("");
    handleCloseModal();
  };

  const form = () => {
    switch (type) {
      case "delete":
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
            <Typography
              variant="h6"
              id="transition-modal-description"
              sx={{ my: 1 }}
            >
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

      case "add":
        return (
          <>
            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h5"
              sx={{ fontWeight: "bold" }}
            >
              Add Child Node
            </Typography>
            <Typography
              id="transition-modal-description"
              variant="h6"
              sx={{ my: 1 }}
            >
              Child Details:
            </Typography>
            <Box component="form" style={sx}>
              <TextField
                id="name"
                label="Skill Name"
                variant="filled"
                size="small"
                sx={sx}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="Group"
                select
                label="Group"
                variant="filled"
                size="small"
                sx={sx}
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              >
                <MenuItem value="Category Label">Category Label</MenuItem>
                <MenuItem value="Subcategory Label">Subcategory Label</MenuItem>
                <MenuItem value="Image">Image</MenuItem>
              </TextField>
              <TextField
                id="Image URL"
                label="Image URL"
                variant="filled"
                size="small"
                sx={sx}
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />
              <TextField
                id="Year"
                label="Year Started"
                variant="filled"
                size="small"
                select
                sx={{ ...sx, mb: 3 }}
                value={yearStarted}
                onChange={(e) => setYearStarted(e.target.value)}
              >
                <MenuItem value="2019">2019</MenuItem>
                <MenuItem value="2020">2020</MenuItem>
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
              </TextField>
              <Fab
                color="secondary"
                aria-label="add"
                sx={{
                  position: "absolute",
                  left: "50%",
                  bottom: "-25px",
                  transform: "translateX(-50%)",
                }}
                onClick={handleAddNode}
              >
                <AddIcon />
              </Fab>
            </Box>
          </>
        );

      case "edit":
        return (
          <>
            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h5"
              sx={{ fontWeight: "bold" }}
            >
              Edit Node
            </Typography>
            <Box component="form" style={{ width: "100%" }}>
              <TextField
                id="name"
                label="Skill Name"
                variant="filled"
                size="small"
                disabled
                sx={{ ...sx, mb: 0 }}
                value={selectedNode}
                onChange={(e) => setName(e.target.value)}
              />
              <Typography variant="subtitle2" color="red" sx={{ mb: 0.5 }}>
                Name of node cannot be changed.
              </Typography>
              <TextField
                id="parent"
                label="Parent Node"
                variant="filled"
                size="small"
                sx={sx}
                value={parent}
                onChange={(e) => setParent(e.target.value)}
              />
              <TextField
                id="Group"
                select
                label="Group"
                variant="filled"
                size="small"
                sx={sx}
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="Category Label">Category Label</MenuItem>
                <MenuItem value="Subategory Label">Subcategory Label</MenuItem>
                <MenuItem value="Image">Image</MenuItem>
              </TextField>
              <TextField
                id="Image URL"
                label="Image URL"
                variant="filled"
                size="small"
                sx={sx}
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />
              <div
                style={{
                  marginTop: 10,
                  marginBottom: 30,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  id="Used Frequency"
                  label="Used Frequency"
                  variant="filled"
                  size="small"
                  sx={{ width: "47.5%" }}
                  value={usedFrequency.toString()}
                  onChange={(e) => setUsedFrequency(e.target.value)}
                />
                <TextField
                  id="Year"
                  label="Year Started"
                  variant="filled"
                  select
                  size="small"
                  sx={{ width: "47.5%" }}
                  value={yearStarted}
                  onChange={(e) => setYearStarted(e.target.value)}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="2019">2019</MenuItem>
                  <MenuItem value="2020">2020</MenuItem>
                  <MenuItem value="2021">2021</MenuItem>
                  <MenuItem value="2022">2022</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                </TextField>
              </div>
              <Fab
                color="secondary"
                aria-label="add"
                sx={{
                  position: "absolute",
                  left: "50%",
                  bottom: "-25px",
                  transform: "translateX(-50%)",
                }}
                onClick={handleUpdateNode}
              >
                <EditIcon />
              </Fab>
            </Box>
          </>
        );

      default:
        return <Container>Default</Container>;
    }
  };

  const handleAddNode = () => {
    addNode({
      name,
      parent: selectedNode,
      group,
      yearStarted,
      imageURL,
      usedFrequency: 0,
    })
      .then(() => {
        resetForm();
      })
      .catch(console.log);
  };

  const handleUpdateNode = () => {
    let skill: any = {
      name: selectedNode,
    };
    if (parent !== "") {
      skill.parent = parent;
    }
    if (group !== "") {
      skill.group = group;
    }
    if (imageURL !== "") {
      skill.imageURL = imageURL;
    }
    if (usedFrequency !== "") {
      skill.usedFrequency = parseInt(usedFrequency);
    }
    if (yearStarted !== "") {
      skill.yearStarted = yearStarted;
    }
    updateNode(skill)
      .then(() => {
        resetForm();
      })
      .catch(console.log);
  };

  const handleDeleteNode = () => {
    deleteNode(selectedNode)
      .then(() => {
        resetForm();
      })
      .catch(console.log);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={resetForm}
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
          {form()}
        </Box>
      </Fade>
    </Modal>
  );
}

export default NodeOptionModals;
