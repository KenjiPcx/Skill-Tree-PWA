import React, { useState, useEffect, useRef } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import { updateNode, batchUpdateNodes } from "../../firebase";
import { Skill } from "../../utils/graphDataTransformer";
import { getAncestorNodes } from "../../utils/filterNodesData";

interface ModalUpdateFormProps {
  selectedNode: string;
  skillsData: Map<string, Skill>;
  handleCloseModal: () => void;
}

function ModalUpdataForm({
  selectedNode,
  skillsData,
  handleCloseModal,
}: ModalUpdateFormProps) {
  const isMounted = useRef<boolean | null>(null);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const skillData = skillsData.get(selectedNode) as Skill;
  const [parent, setParent] = useState("");
  const [group, setGroup] = useState(skillData?.group);
  const [imageURL, setImageURL] = useState("");
  const [yearStarted, setYearStarted] = useState("");
  const [usedFrequency, setUsedFrequency] = useState(
    skillData?.usedFrequency?.toString() as string
  );
  const [error, setError] = useState(false);

  const handleUpdateNode = async (e?: React.SyntheticEvent) => {
    if (usedFrequency !== "" && !isNaN(parseInt(usedFrequency))) {
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
      if (yearStarted !== "") {
        skill.yearStarted = yearStarted;
      }
      if (usedFrequency !== "") {
        skill.usedFrequency = parseInt(usedFrequency);
        const frequencyGain =
          parseInt(usedFrequency) - (skillData.usedFrequency as number);
        const skills = getAncestorNodes(skillsData, selectedNode).map(
          (skill) => {
            return {
              name: skill.name,
              usedFrequency: (skill.usedFrequency as number) + frequencyGain,
            };
          }
        );
        await batchUpdateNodes(skills, skill).catch(console.log);
      } else {
        await updateNode(skill).catch(console.log);
      }
      if (isMounted.current) {
        setParent("");
        setGroup("");
        setImageURL("");
        setYearStarted("");
        setUsedFrequency("");
        handleCloseModal();
      }
    } else {
      if (isMounted.current) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1500);
      }
    }
  };

  const handleUpdateWithEnter = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") {
      return;
    }
    handleUpdateNode();
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
      <Box
        style={{ width: "100%" }}
        component="form"
        onKeyPress={handleUpdateWithEnter}
      >
        <TextField
          id="name"
          label="Skill Name"
          variant="filled"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          sx={{ ...sx, mb: 0 }}
          value={selectedNode}
        />
        <Typography variant="subtitle2" color="red" sx={{ mb: 0.5 }}>
          Name of node cannot be changed.
        </Typography>
        <TextField
          id="parent"
          label="Parent Node"
          variant="outlined"
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
            value={usedFrequency}
            onChange={(e) => setUsedFrequency(e.target.value)}
            error={error}
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
