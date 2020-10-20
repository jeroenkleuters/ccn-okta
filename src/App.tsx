// src/App.tsx
import React, { useContext } from "react";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SunnyIcon from "@material-ui/icons/WbSunny";
import { Switch, Route, Link as RouterLink } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import { ThemeContext } from "./lib/theme";

export default function App() {
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.colors.backgroundColor }}>
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
          <Button color="inherit" component={RouterLink} to="/signup">
            Signup
          </Button>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ height: "2rem" }} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}
