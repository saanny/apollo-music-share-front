import { createTheme } from "@material-ui/core/styles";
const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#212121",
      light: "#484848",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#bdbdbd",
      light: "#efefef",
      dark: "#8d8d8d",
      contrastText: "#000000",
    },
  },
});

export default theme;
