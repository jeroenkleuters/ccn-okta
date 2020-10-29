// src/App.tsx
import React from "react";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SunnyIcon from "@material-ui/icons/WbSunny";
import { Link as RouterLink } from "react-router-dom";

import { useTheme } from "../lib/theme";
import { selectUser, selectAuthStatus } from "../store/auth/selectors";
import { useMyOkta } from "../lib/okta";

export function NavBar() {
  const { theme, toggle } = useTheme();
  const authStatus = useSelector(selectAuthStatus);
  const user = useSelector(selectUser);

  const { loginRedirect, logout } = useMyOkta();

  return (
    <AppBar position="static">
      <Toolbar
        style={{
          backgroundColor: theme.colors.toolbarBackgroundColor,
        }}
      >
        <IconButton
          component={RouterLink}
          to="/"
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          onClick={toggle}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <SunnyIcon />
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        {authStatus === "loading" ? (
          <p>loading...</p>
        ) : user ? (
          <>
            <strong>{user.name}</strong>
            <Button color="inherit" component={RouterLink} to="/my">
              My profile
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={loginRedirect}>
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
