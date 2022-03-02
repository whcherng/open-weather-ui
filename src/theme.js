import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    background: { paper: "#556cd6" },
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    text: {
      white: '#FFFFFF',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
