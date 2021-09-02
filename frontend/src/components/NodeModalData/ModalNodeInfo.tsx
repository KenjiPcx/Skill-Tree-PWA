import React, { useCallback } from "react";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Rating from "@material-ui/core/Rating";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { generateNodeInfo, getMult } from "../../utils/nodeInfoMethods";

interface ModalNodeInfoProps {
  skillData: any;
}

interface GeneratedVars {
  color: string;
  level: string;
  msg: string;
  msg2: string;
  rating: number;
}

function ModalNodeInfo({ skillData }: ModalNodeInfoProps) {
  const currentYear = new Date().getFullYear();

  const { color, level, msg, msg2, rating }: GeneratedVars = generateNodeInfo(
    skillData.usedFrequency,
    getMult(skillData.group)
  );

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
            skillData.yearStarted > currentYear
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
    </Container>
  );
}

export default ModalNodeInfo;
