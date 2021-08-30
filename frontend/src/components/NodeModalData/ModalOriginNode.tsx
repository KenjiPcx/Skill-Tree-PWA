import React from "react";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Rating from "@material-ui/core/Rating";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import KenjiPic from "../../assets/kenji.png";
import {
  calcUserStats,
  generateNodeInfo,
  getMult,
} from "../../utils/nodeInfoMethods";
import CircularProgress, {
  circularProgressClasses,
} from "@material-ui/core/CircularProgress";

interface ModalOriginNodeProps {
  skillsData: Map<string, any>;
}

const normalise = (value: number, min: number, max: number) => {
  if (max - min === 0) return 100;
  return ((value - min) * 100) / (max - min);
};

function ModalOriginNode({ skillsData }: ModalOriginNodeProps) {
  const { totalUsedFreq, avgUsedFreq } = calcUserStats(skillsData);
  const { color, level, rating, starting, nextLvlReq } = generateNodeInfo(
    avgUsedFreq,
    getMult("Origin")
  );
  console.log(
    nextLvlReq,
    avgUsedFreq,
    normalise(avgUsedFreq, starting, nextLvlReq)
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
        Kenji
      </Typography>
      <Typography
        variant="subtitle1"
        color={color}
        sx={{ mb: 1.5 }}
      >
        {`<-The One Who Codes->`}
      </Typography>
      <Box
        sx={{
          width: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          my: 2,
        }}
      >
        <CardMedia
          component="img"
          image={KenjiPic}
          alt="User Image"
          sx={{ borderRadius: "50%" }}
        />
        <CircularProgress
          variant="determinate"
          size={110}
          thickness={2.5}
          value={100}
          sx={{
            position: "absolute",
            zIndex: 1,
            color: (theme) => theme.palette.action.disabled,
          }}
        />
        <CircularProgress
          variant="determinate"
          size={110}
          thickness={2.5}
          value={normalise(avgUsedFreq, starting, nextLvlReq)}
          sx={{
            color: color,
            position: "absolute",
            zIndex: 1,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
        />
      </Box>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        Level:{" "}
        {
          <Typography
            variant="subtitle1"
            component="span"
            sx={{ fontWeight: "bold" }}
            color={color}
          >
            {level}
          </Typography>
        }
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
        Experience: {totalUsedFreq}Exp
      </Typography>
      <Typography align="center" paragraph sx={{mt: 1}}>He is a man of focus, commitment, sheer will</Typography>
      <Rating name="read-only" value={rating} readOnly />
    </Container>
  );
}

export default ModalOriginNode;
