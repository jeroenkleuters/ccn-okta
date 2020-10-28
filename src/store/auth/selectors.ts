import { State } from "../types";

export const selectUser = (reduxState: State) => {
  return reduxState.auth?.user;
};
