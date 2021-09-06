import React, { useState, useMemo, useEffect } from "react";
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
import Autocomplete from "@material-ui/core/Autocomplete";

import generateAppInfoNodes from "../utils/generateAppInfoNodes";
import { GraphData, Skill } from "../Types";
import { useSpring, animated } from "react-spring";

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
  skillsData: Map<string, Skill>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  setGraphData: React.Dispatch<React.SetStateAction<GraphData>>;
}

export default function SearchAppBar({
  hideUI,
  search,
  graphName,
  skillsData,
  setSearch,
  handleSearch,
  setGraphData,
}: SearchAppBarProps) {
  const [inputSearch, setInputSearch] = useState("");

  const skillnames = useMemo(() => {
    if (graphName === "Knowledge Network") {
      const options = Array.from(skillsData.values())
        .filter((skill) => skill.usedFrequency && skill.usedFrequency > 0)
        .map((skill) => skill.name);
      options.push("");
      return options;
    } else {
      const options = Array.from(skillsData.values()).map(
        (skill) => skill.name
      );
      options.push("");
      return options;
    }
  }, [skillsData, graphName]);

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

  useEffect(() => {
    if (inputSearch === "") {
      setSearch("");
    }
  }, [inputSearch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AnimatedAppBar position="fixed" style={topTranslation}>
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
              <Autocomplete
                sx={{ width: "100%" }}
                disabled={
                  graphName !== "Knowledge Network" &&
                  graphName !== "Learning List"
                }
                disablePortal
                value={search}
                onChange={(event: any, newSearch: string | null) => {
                  if (newSearch !== null) {
                    setSearch(newSearch);
                  }
                }}
                inputValue={inputSearch}
                onInputChange={(event, newInputSearch) => {
                  setInputSearch(newInputSearch);
                }}
                options={skillnames}
                ListboxProps={{
                  style: {
                    maxHeight: 190,
                  },
                }}
                renderInput={(params) => {
                  const { InputLabelProps, InputProps, ...rest } = params;
                  return (
                    <StyledInputBase
                      placeholder="Search…"
                      {...params.InputProps}
                      {...rest}
                    />
                  );
                }}
              />
            </Search>
          </Box>
        </Toolbar>
      </AnimatedAppBar>
    </Box>
  );
}
