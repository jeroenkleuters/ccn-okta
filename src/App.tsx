// src/App.tsx
import React, { useContext } from "react";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SunnyIcon from "@material-ui/icons/WbSunny";
import { Switch, Route, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import { ThemeContext } from "./lib/theme";
import { FetchDataCacheContext } from "./lib/fetchDataCache";
import { State } from "./store/types";

const selectUser = (reduxState: State) => {
  return reduxState.user;
};

export default function App() {
  const { theme, toggle } = useContext(ThemeContext);

  const user = useSelector(selectUser);

  const { addItem, getResultsForUrl, cache } = useContext(
    FetchDataCacheContext
  );
  console.log("current cache:", cache);
  console.log("has item?:", getResultsForUrl("http://ab.cd"));

  // just attach this to any random element in the page for now ;)
  const onClickWhatever = () => {
    addItem("http://ab.cd", { answer: 42 });
  };

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
          {user ? (
            <>
              <strong>{user.name}</strong>
              <Button color="inherit">Logout</Button>
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
          )}
        </Toolbar>
      </AppBar>
      <div style={{ height: "2rem" }}>
        <button onClick={onClickWhatever}>test adding item to cache</button>
      </div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}
