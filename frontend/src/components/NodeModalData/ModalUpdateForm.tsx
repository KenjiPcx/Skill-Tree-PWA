import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import { updateNode } from "../../firebase";

interface ModalUpdateFormProps {
  selectedNode: string;
  handleCloseModal: () => void;
}

function ModalUpdataForm({
  selectedNode,
  handleCloseModal,
}: ModalUpdateFormProps) {
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
}

export default ModalUpdataForm;
