// src/App.tsx
import React from "react";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SunnyIcon from "@material-ui/icons/WbSunny";
import { Link as RouterLink } from "react-router-dom";

import { useTheme } from "../lib/theme";

export function NavBar() {
  const { theme, toggle } = useTheme();

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
        {/* {user ? (
          <>
            <strong>{user.name}</strong>
            <Button
              color="inherit"
              onClick={() => {
                // dispatch({ type: "logout" });
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/signup">
              Signup
            </Button>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          </>
        )} */}
      </Toolbar>
    </AppBar>
  );
}
