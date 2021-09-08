import React, { useState, useEffect, useRef } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import { addNode } from "../../firebase";

interface ModalAddFormProps {
  selectedNode: string;
  handleCloseModal: () => void;
}

function ModalAddForm({ selectedNode, handleCloseModal }: ModalAddFormProps) {
  const isMounted = useRef<boolean | null>(null);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const nextYear = new Date().getFullYear() - 2;
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [yearStarted, setYearStarted] = useState("");
  const [error, setError] = useState(false);

  const generateYearOptions = (rows: number) => {
    return [...Array(rows)].map((row, val) => {
      return (
        <MenuItem key={val} value={nextYear + val}>
          {nextYear + val}
        </MenuItem>
      );
    });
  };

  const handleAddNode = (e?: React.SyntheticEvent) => {
    if (name === selectedNode) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1500);
      return;
    }
    if (name !== "" && group !== "") {
      e?.preventDefault();
      const skill = {
        name,
        parent: selectedNode,
        group,
        yearStarted,
        imageURL,
        usedFrequency: 0,
      };

      addNode(skill)
        .then(() => {
          if (isMounted.current) {
            setName("");
            setGroup("");
            setImageURL("");
            setYearStarted("");
            handleCloseModal();
          }
        })
        .catch(console.log);
    } else {
      if (isMounted.current) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1500);
      }
    }
  };

  const handleAddWithEnter = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") {
      return;
    }
    handleAddNode();
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
      <Box component="form" style={sx} onKeyPress={handleAddWithEnter}>
        <TextField
          id="name"
          label="Skill Name"
          variant="filled"
          size="small"
          required
          error={error}
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
          required
          error={error}
          sx={sx}
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          <MenuItem value="Category Label">Category Label</MenuItem>
          <MenuItem value="Subcategory Label">Subcategory Label</MenuItem>
          <MenuItem value="Image">Image</MenuItem>
        </TextField>
        {group === "Image" ? (
          <TextField
            id="Image URL"
            label="Image URL"
            variant="filled"
            size="small"
            sx={sx}
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        ) : (
          ""
        )}
        <TextField
          id="Year"
          label="Starting Year"
          variant="filled"
          size="small"
          select
          sx={{ ...sx, mb: 3 }}
          value={yearStarted}
          onChange={(e) => setYearStarted(e.target.value)}
        >
          {generateYearOptions(5)}
        </TextField>
        <Tooltip title="Add Node">
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
        </Tooltip>
      </Box>
    </>
  );
}

export default ModalAddForm;
