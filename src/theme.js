import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Manrope", sans-serif',
    h5: {
      fontSize: "20px",
      fontWeight: 600,
      color: "#101828",
      textAlign: "left",
    },
    subtitle1: {
      fontSize: "16px",
      fontWeight: 500,
      color: "#8D929A",
      textAlign: "left",
    },
  },
  palette: {
    primary: { main: "#101828" },
    secondary: { main: "#8D929A" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Manrope", sans-serif',
          border: "none",
          borderRadius: "8px",
          padding: "12px 24px",
          fontWeight: 500,
          textTransform: "none",
        },
      },
    },
  },
  spacing: 8,
});

export default theme;
