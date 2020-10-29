import React, { useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectAuthStatus } from "../store/auth/selectors";
import { useMyOkta } from "./okta";

export function SecureRoute(props: RouteProps) {
  const authStatus = useSelector(selectAuthStatus);
  const { authClient } = useMyOkta();

  useEffect(() => {
    if (authStatus === "logged_out") {
      authClient.token.getWithRedirect();
    }
  }, [authStatus, authClient]);

  if (authStatus === "logged_in") {
    return <Route {...props} />;
  }

  return null;
}
