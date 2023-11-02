import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PageFunctionsButton from "./PageFunctionButton";
import { NavBarStyles } from "./styles";
import { useTheme } from "@mui/material";

export default function NavBar() {
  const theme = useTheme();
  const styles = NavBarStyles(theme);

  return (
    <AppBar position="static" sx={styles.NavBar}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <img
          src="/images/logo-white.svg"
          alt="Company Logo"
          width={300}
          height={40}
          loading="eager"
        />

        <PageFunctionsButton />
      </Toolbar>
    </AppBar>
  );
}
