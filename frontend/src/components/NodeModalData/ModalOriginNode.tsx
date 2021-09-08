import React, { useState, useEffect, useRef } from "react";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Rating from "@material-ui/core/Rating";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import LockIcon from "@material-ui/icons/Lock";
import Fade from "@material-ui/core/Fade";
import KenjiPic from "../../assets/kenji.png";
import {
  calcUserStats,
  generateNodeInfo,
  getMult,
} from "../../utils/nodeInfoMethods";
import CircularProgress, {
  circularProgressClasses,
} from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../AuthProvider";
interface ModalOriginNodeProps {
  skillsData: Map<string, any>;
}

const normalise = (value: number, min: number, max: number) => {
  if (max - min === 0) return 100;
  return ((value - min) * 100) / (max - min);
};

function ModalOriginNode({ skillsData }: ModalOriginNodeProps) {
  const isMounted = useRef<boolean | null>(null);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const loggedIn = useAuth();
  const [showTextField, setShowTextField] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { totalUsedFreq, avgUsedFreq } = calcUserStats(skillsData);
  const { color, colorType, level, rating, starting, nextLvlReq } =
    generateNodeInfo(avgUsedFreq, getMult("Origin"));

  const handleAuth = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!loggedIn) {
      if (!showTextField) {
        setShowTextField((val) => !val);
        return;
      }
      if (password === "" && showTextField) {
        setError(true);
        setTimeout(() => {
          if (isMounted.current) {
            setError(false);
            setShowTextField((val) => !val);
          }
        }, 1000);
        return;
      }
      signInWithEmailAndPassword(auth, "ken.pcx@outlook.com", password)
        .then(() => {
          if (isMounted.current) {
            setPassword("");
            setShowTextField(false);
          }
        })
        .catch(() => {
          if (isMounted.current) {
            setError(true);
            setPassword("");
            setTimeout(() => {
              setError(false);
            }, 2000);
          }
        });
    } else {
      signOut(auth).catch(console.log);
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
        Kenji
      </Typography>
      <Typography variant="subtitle1" color={color} sx={{ mb: 1.5 }}>
        {`<-The One Who Codes->`}
      </Typography>
      <Box
        sx={{
          width: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          my: 2,
        }}
        onClick={handleAuth}
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
        <Fade in={!loggedIn}>
          <LockIcon
            sx={{ position: "absolute", right: -5, bottom: 0, zIndex: 10 }}
          />
        </Fade>
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
        Experience: {totalUsedFreq} Exp
      </Typography>
      <Box component="form" onSubmit={handleAuth} sx={{ width: "85%" }}>
        {showTextField ? (
          <TextField
            error={error}
            variant="outlined"
            label="Password"
            type="password"
            color={colorType}
            sx={{ mt: 2, mb: 2, width: "100%" }}
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : (
          <Typography align="center" paragraph sx={{ mt: 1 }}>
            He is a man of focus, commitment, sheer will
          </Typography>
        )}
      </Box>
      <Rating name="read-only" value={rating} readOnly />
    </Container>
  );
}

export default ModalOriginNode;
