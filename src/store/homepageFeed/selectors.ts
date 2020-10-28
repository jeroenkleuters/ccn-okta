import { State } from "../types";

export const selectHomepageFeed = (reduxState: State) => {
  return reduxState.homepageFeed;
};
