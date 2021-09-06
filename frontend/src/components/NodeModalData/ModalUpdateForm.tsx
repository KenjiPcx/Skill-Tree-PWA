import React, { useState, useEffect, useRef, useMemo } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import Autocomplete from "@material-ui/core/Autocomplete";

import { updateNode, batchUpdateNodes } from "../../firebase";
import { Skill } from "../../Types";
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
  const [parent, setParent] = useState<string | null | undefined>(skillData.parent);
  const [inputParent, setInputParent] = useState(skillData.parent);
  const [group, setGroup] = useState(skillData.group);
  const [imageURL, setImageURL] = useState("");
  const [yearStarted, setYearStarted] = useState("");
  const [usedFrequency, setUsedFrequency] = useState(
    skillData?.usedFrequency?.toString() as string
  );

  const parentOptions = useMemo(() => {
    const parents = Array.from(skillsData.values()).map((skill) => skill.name);
    parents.push("Origin");
    return parents;
  }, [skillsData]);

  const generateYearOptions = (rows: number) => {
    let year = 0;
    if (skillData.yearStarted) {
      year = parseInt(skillData.yearStarted) - 1;
    } else {
      year = new Date().getFullYear() - 1;
    }
    return [...Array(rows)].map((row, val) => {
      return (
        <MenuItem key={val} value={year + val}>
          {year + val}
        </MenuItem>
      );
    });
  };

  const generateUsageFrequency = (rows: number) => {
    let usage = 0;
    if (skillData.usedFrequency && skillData.usedFrequency > 1) {
      usage = skillData.usedFrequency - 2;
    }
    return [...Array(rows)].map((row, val) => {
      return (
        <MenuItem key={val} value={usage + val}>
          {usage + val}
        </MenuItem>
      );
    });
  };

  const handleUpdateNode = async (e?: React.SyntheticEvent) => {
    let skill: any = {
      name: selectedNode,
    };

    if (group !== "") {
      skill.group = group;
    }
    if (imageURL !== "") {
      skill.imageURL = imageURL;
    }
    if (yearStarted !== "") {
      skill.yearStarted = yearStarted;
    }

    if (parent !== "") {
      skill.parent = parent;
      if (skillData.parent) {
        const oldParent = skillsData.get(skillData.parent) as Skill;
      }
    }

    const frequencyGain =
      parseInt(usedFrequency) - (skillData.usedFrequency as number);
    if (frequencyGain !== 0) {
      skill.usedFrequency = parseInt(usedFrequency);
      const skills = getAncestorNodes(skillsData, selectedNode).map((skill) => {
        return {
          name: skill.name,
          usedFrequency: (skill.usedFrequency as number) + frequencyGain,
        };
      });
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

  useEffect(() => {
    console.log(parent)
  }, [parent])

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
        <Autocomplete
          id="parent"
          disablePortal
          options={parentOptions}
          value={parent}
          onChange={(event: any, newParent: string | null) => {
            setParent(newParent);
          }}
          inputValue={inputParent}
          onInputChange={(event, newInputParent) => {
            setInputParent(newInputParent);
          }}
          ListboxProps={{
            style: {
              maxHeight: 190,
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Parent Node"
              variant="filled"
              size="small"
              sx={sx}
            />
          )}
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
        <Box
          component="div"
          sx={{
            marginTop: 1,
            marginBottom: 3,
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
            select
          >
            {generateUsageFrequency(5)}
          </TextField>
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
            <MenuItem value="">None</MenuItem>
            {generateYearOptions(3)}
          </TextField>
        </Box>
        <Tooltip title="Save">
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
        </Tooltip>
      </Box>
    </>
  );
}

export default ModalUpdataForm;
