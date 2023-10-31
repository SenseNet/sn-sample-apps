import React from "react";
import { useOidcAuthentication } from "@sensenet/authentication-oidc-react";
import { Button, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { LoginButtonStyle } from "./styles";
import { useRepository } from "@sensenet/hooks-react";

function PageFunctionsButton() {
  const { oidcUser, login, logout } = useOidcAuthentication();
  const theme = useTheme();
  const styles = LoginButtonStyle(theme);

  const repository = useRepository();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenRepo = () => {
    const url = new URL(process.env.REACT_APP_AdminUrl || "");

    url.searchParams.append(
      "repoUrl",
      encodeURI(repository.configuration.repositoryUrl)
    );

    window.open(url.toString(), "_blank");
    setAnchorEl(null);
  };

  if (!oidcUser) {
    return (
      <Button variant="outlined" onClick={login} sx={styles.LoginButton}>
        Login
      </Button>
    );
  }

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleOpenRepo}
      >
        <MenuItem onClick={handleOpenRepo}>Open Repository</MenuItem>
        <MenuItem onClick={logout}>Log out</MenuItem>
      </Menu>
    </>
  );
}

export default PageFunctionsButton;
