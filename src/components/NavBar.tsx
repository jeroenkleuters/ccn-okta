// src/App.tsx
import React from "react";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SunnyIcon from "@material-ui/icons/WbSunny";
import { Link as RouterLink } from "react-router-dom";
// @ts-ignore
import { useOktaAuth } from "@okta/okta-react";

import { useTheme } from "../lib/theme";
import { selectUser } from "../store/auth/selectors";

export function NavBar() {
  const { theme, toggle } = useTheme();
  const user = useSelector(selectUser);

  const { authService, authState } = useOktaAuth();

  const authLoading =
    authState.isPending || (authState.isAuthenticated && !user);

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
        {authLoading ? (
          <strong>loading...</strong>
        ) : user ? (
          <>
            <strong>{user.name}</strong>
            <Button
              color="inherit"
              onClick={() => {
                authService.logout();
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              onClick={() => {
                authService.login();
              }}
            >
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
