// src/App.tsx
import React, { useContext } from "react";
import { AppBar, Box, Toolbar, IconButton, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SunnyIcon from "@material-ui/icons/WbSunny";
import { Switch, Route, Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// @ts-ignore
import { SecureRoute } from "@okta/okta-react";

import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import { useTheme } from "./lib/theme";
import { FetchDataCacheContext } from "./lib/fetchDataCache";
import { selectUser } from "./store/auth/selectors";
import ProfilePage from "./pages/my/ProfilePage";

export default function App() {
  const dispatch = useDispatch();
  const { theme, toggle } = useTheme();

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
    <Box pb={10} style={{ backgroundColor: theme.colors.backgroundColor }}>
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
              <Button
                color="inherit"
                onClick={() => {
                  dispatch({ type: "logout" });
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
        <SecureRoute exact path="/my" component={ProfilePage} />
      </Switch>
    </Box>
  );
}
