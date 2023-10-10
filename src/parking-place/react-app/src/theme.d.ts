// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    sizes: {
      desktopMaxWidth: React.CSSProperties["width"];
      contentWidth: React.CSSProperties["width"];
      navbarHeight: React.CSSProperties["height"];
    };
  }
  interface ThemeOptions {
    sizes: {
      desktopMaxWidth: React.CSSProperties["width"];
      contentWidth: React.CSSProperties["width"];
      navbarHeight: React.CSSProperties["height"];
    };
  }

  interface Theme {
    borderRadius: {
      sm: React.CSSProperties["borderRadius"];
      md: React.CSSProperties["borderRadius"];
      lg: React.CSSProperties["borderRadius"];
    };
  }
  interface ThemeOptions {
    borderRadius: {
      sm: React.CSSProperties["borderRadius"];
      md: React.CSSProperties["borderRadius"];
      lg: React.CSSProperties["borderRadius"];
    };
  }
}
