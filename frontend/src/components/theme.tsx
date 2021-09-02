import { createTheme } from "@material-ui/core/styles";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#6200EE",
    },
    secondary: {
      main: "#03DAC5",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6200EE",
    },
    secondary: {
      main: "#03DAC5",
    },
    background: {
      paper: "#292929",
    },
  },
});
