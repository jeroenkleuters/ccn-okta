import { State } from "../types";

export const selectAuthStatus = (reduxState: State) => {
  return reduxState.auth.status;
};

export const selectUser = (reduxState: State) => {
  return reduxState.auth.status === "logged_in"
    ? reduxState.auth.user
    : undefined;
};
