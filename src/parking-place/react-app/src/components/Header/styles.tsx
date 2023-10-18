import { SxProps, Theme } from "@mui/material";

export const NavBarStyles = (
  theme: Theme
): Record<string, SxProps<Theme> | undefined> => ({
  NavBar: {
    position: "fixed",
    flexDirection: "row",
    justifyContent: "center",
    "& .MuiToolbar-root": {
      backgroundColor: theme.palette.primary.main,
      justifyContent: "space-between",
      maxWidth: theme.sizes.desktopMaxWidth,
      height: theme.sizes.navbarHeight,
      flex: 1,
    },
  },
});

export const LoginButtonStyle = (
  theme: Theme
): Record<string, SxProps<Theme> | undefined> => ({
  LoginButton: {
    background: "#fff",
    color: theme.palette.primary.main,
    "&:hover": {
      background: "#fff",
      color: theme.palette.primary.main,
    },
  },
});
