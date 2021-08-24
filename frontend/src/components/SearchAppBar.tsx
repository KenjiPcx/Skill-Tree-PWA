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
    // vertical padding + font size from searchIcon
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
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  setFocusedNode: React.Dispatch<React.SetStateAction<string>>;
  setGraph: React.Dispatch<any>;
}

export default function SearchAppBar({
  hideUI,
  search,
  setSearch,
  handleSearch,
  setFocusedNode,
  setGraph,
}: SearchAppBarProps) {
  const topTranslation = useSpring({
    transform: hideUI ? `translateY(-100px)` : "translateY(0px)",
    // opacity: !hideUI,
  });

  const handleInjectAppInfo = () => {
    setFocusedNode("App Info");
    setGraph(generateAppInfoNodes());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AnimatedAppBar position="absolute" style={topTranslation}>
        <Toolbar>
          <Tooltip title="Menu">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                flexGrow: 1,
                flexBasis: "10%",
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
              flexGrow: 1,
              flexBasis: "45%",
              display: { xs: "block", sm: "block" },
            }}
          >
            Skill Tree
          </Typography>
          <form
            style={{ flexGrow: 1, flexBasis: "45%" }}
            onSubmit={handleSearch}
          >
            <Search>
              <SearchIconWrapper onClick={() => console.log(search)}>
                <SearchIcon onClick={() => console.log(search)} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Search>
          </form>
        </Toolbar>
      </AnimatedAppBar>
    </Box>
  );
}
