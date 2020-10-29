// src/App.tsx
import React from "react";
import { Box } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import { useTheme } from "./lib/theme";
import ProfilePage from "./pages/my/ProfilePage";
import { NavBar } from "./components/NavBar";
import { useMyOkta } from "./lib/okta";
import { SecureRoute } from "./lib/SecureRoute";
// import { useAuthSync } from "./lib/useAuthSync";

export default function App() {
  const { theme } = useTheme();

  useMyOkta();

  return (
    <Box pb={10} style={{ backgroundColor: theme.colors.backgroundColor }}>
      <NavBar />
      <Box mt={4}>
        <Switch>
          {/* <Route exact path="/implicit/callback" component={LoginCallback} /> */}
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/login" component={LoginPage} />
          <SecureRoute exact path="/my" component={ProfilePage} />
        </Switch>
      </Box>
    </Box>
  );
}
