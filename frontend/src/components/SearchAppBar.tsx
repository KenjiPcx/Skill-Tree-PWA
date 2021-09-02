import React from "react";
import { styled, alpha } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import SearchIcon from "@material-ui/icons/Search";
import Tooltip from "@material-ui/core/Tooltip";
import { useSpring, animated } from "react-spring";
import generateAppInfoNodes from "../utils/generateAppInfoNodes";
import { GraphData } from "../Types";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const AnimatedAppBar = animated(AppBar);

interface SearchAppBarProps {
  hideUI: boolean;
  search: string;
  graphName:
    | "Knowledge Network"
    | "Learning List"
    | "Learning Stats"
    | "Timeline"
    | "App Info";
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  setGraphData: React.Dispatch<React.SetStateAction<GraphData>>;
}

export default function SearchAppBar({
  hideUI,
  search,
  graphName,
  setSearch,
  handleSearch,
  setGraphData,
}: SearchAppBarProps) {
  const topTranslation = useSpring({
    delay: hideUI ? 0 : 50,
    transform: hideUI ? `translateY(-100px)` : "translateY(0px)",
  });

  const handleInjectAppInfo = () => {
    setGraphData((data: GraphData) => {
      return {
        graphName: "App Info",
        focusedNode: "App Info",
        graph: generateAppInfoNodes(),
      };
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AnimatedAppBar position="absolute" style={topTranslation}>
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              flexBasis: "65%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              ml: 1,
            }}
          >
            <Tooltip title="App Info">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{
                  flexGrow: 0,
                  width: "max-content",
                }}
                onClick={handleInjectAppInfo}
              >
                <AccountTreeIcon />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h6"
              noWrap
              component="div"
              align="left"
              sx={{
                display: { xs: "block", sm: "block" },
              }}
            >
              Skill Tree
            </Typography>
          </Box>
          <Box
            component="form"
            style={{ flexGrow: 1, flexBasis: "45%" }}
            onSubmit={handleSearch}
          >
            <Search sx={{ width: "100%", mr: 0 }}>
              <SearchIconWrapper sx={{ width: "10%" }}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                disabled={
                  graphName !== "Knowledge Network" &&
                  graphName !== "Learning List"
                }
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Search>
          </Box>
        </Toolbar>
      </AnimatedAppBar>
    </Box>
  );
}
