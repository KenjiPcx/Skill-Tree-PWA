import React from "react";
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
  },
});
