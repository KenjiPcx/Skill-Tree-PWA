import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { addNode } from "../../firebase";

interface ModalAddFormProps {
  selectedNode: string;
  handleCloseModal: () => void;
}

function ModalAddForm({ selectedNode, handleCloseModal }: ModalAddFormProps) {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [yearStarted, setYearStarted] = useState("");

  const handleAddNode = () => {
    const skill = {
      name,
      parent: selectedNode,
      group,
      yearStarted,
      imageURL,
      usedFrequency: 0,
    };

    setName("");
    setGroup("");
    setImageURL("");
    setYearStarted("");

    addNode(skill)
      .then(() => {
        handleCloseModal();
      })
      .catch(console.log);
  };

  const sx = {
    width: "100%",
    my: 1,
    borderRadius: "20px",
  };

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
      <Typography id="transition-modal-description" variant="h6" sx={{ my: 1 }}>
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
}

export default ModalAddForm;
