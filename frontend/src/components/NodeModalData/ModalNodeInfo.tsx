import React, { useState, useEffect, useRef } from "react";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Rating from "@material-ui/core/Rating";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { generateNodeInfo, getMult } from "../../utils/nodeInfoMethods";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Tooltip from "@material-ui/core/Tooltip";

import { batchUpdateNodes } from "../../firebase";
import { getAncestorNodes } from "../../utils/filterNodesData";
import { Skill } from "../../Types";
import { useAuth } from "../AuthProvider";

interface ModalNodeInfoProps {
  selectedNode: string;
  skillsData: Map<string, Skill>;
  handleCloseModal: () => void;
}

interface GeneratedVars {
  color: string;
  level: string;
  msg: string;
  msg2: string;
  rating: number;
}

function ModalNodeInfo({
  selectedNode,
  skillsData,
  handleCloseModal,
}: ModalNodeInfoProps) {
  const loggedIn = useAuth();
  const isMounted = useRef<boolean | null>(null);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [error, setError] = useState(false);
  const skillData = skillsData.get(selectedNode) as Skill;
  const currentYear = new Date().getFullYear();

  const { color, level, msg, msg2, rating }: GeneratedVars = generateNodeInfo(
    skillData.usedFrequency as number,
    getMult(skillData.group)
  );

  const handleIncrementFreq = async () => {
    if (!loggedIn) {
      if (isMounted.current) {
        setError(true);
        setTimeout(() => {
          if (isMounted.current) {
            setError(false);
          }
        }, 1500);
      }
      return;
    }

    if (skillData && skillData.usedFrequency) {
      const skill = {
        name: selectedNode,
        usedFrequency: skillData.usedFrequency + 1,
      };
      const skills = getAncestorNodes(skillsData, selectedNode).map((skill) => {
        return {
          name: skill.name,
          usedFrequency: (skill.usedFrequency as number) + 1,
        };
      });
      await batchUpdateNodes(skills, skill)
        .then(() => {
          handleCloseModal();
        })
        .catch(console.log);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography align="center" variant="h5" sx={{ fontWeight: "bold" }}>
        {skillData.name}
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        color={color}
        sx={{ mb: 1.5 }}
      >
        {skillData.group === "Image" ? `<-Skill->` : `<-${skillData.group}->`}
      </Typography>
      {skillData.group === "Image" ? (
        <Box
          sx={{
            width: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <CardMedia
            component="img"
            image={skillData.imageURL}
            alt="Skill Image"
          />
        </Box>
      ) : (
        ""
      )}
      {skillData.yearStarted ? (
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {`${
            parseInt(skillData.yearStarted) > currentYear
              ? "Starting Year"
              : "Year Started"
          }: ${skillData.yearStarted}`}
        </Typography>
      ) : (
        ""
      )}
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ mb: 1, fontWeight: "bold" }}
      >
        {`Used Frequency: ${skillData.usedFrequency}`}
      </Typography>
      <Typography align="center" paragraph>
        {`Your experience in ${skillData.name} ${msg} `}
        <Box component="span" sx={{ fontWeight: "bold" }} color={color}>
          {level}
        </Box>
        {msg2}
      </Typography>
      <Rating name="read-only" value={rating} readOnly />
      <Tooltip title="Increment Usage">
        <Fab
          color="secondary"
          aria-label="add"
          size="small"
          sx={{
            position: "absolute",
            right: 25,
            bottom: 25,
          }}
          onClick={handleIncrementFreq}
        >
          {error ? <ErrorOutlineIcon /> : <AddIcon />}
        </Fab>
      </Tooltip>
    </Container>
  );
}

export default ModalNodeInfo;
