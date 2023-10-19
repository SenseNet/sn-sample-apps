import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface ThemeContextProps {
  children: React.ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#0572E2",
      contrastText: "#fff",
    },
    grey: {
      500: "#EEEEEE",
      "700": "#6c6c6c",
    },
    info: {
      main: "#03DABB",
    },
    secondary: {
      main: "#252A32",
      contrastText: "#fff",
    },
    background: {
      default: "#eeeeee",
      paper: "#fff",
    },
  },
  borderRadius: {
    sm: "8px",
    md: "20px",
    lg: "50%",
  },
  zIndex: {
    appBar: 1200,
  },
  sizes: {
    desktopMaxWidth: "1280px",
    navbarHeight: "64px",
    contentWidth: "1024px",
  },
  spacing: 5,
});

export function ThemeContext({ children }: ThemeContextProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default ThemeContext;
