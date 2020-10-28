// src/store/homepage/actions.ts

import { ThunkResult } from "../types";
import axios from "axios";

export const fetchPostsForTag = (tag: string): ThunkResult => {
  return async (dispatch, getState) => {
    const state = getState().homepageFeed[tag];
    if (!state) {
      dispatch({
        type: "homepage_feed_fetching",
        payload: {
          tag,
        },
      });
      try {
        const res = await axios.get(
          "https://codaisseur-coders-network-okta.herokuapp.com/posts?tag=" +
            tag
        );
        dispatch({
          type: "homepage_feed_fetched",
          payload: {
            tag,
            data: res.data,
          },
        });
      } catch (error) {
        dispatch({
          type: "homepage_feed_error",
          payload: { tag, error },
        });
      }
    }
  };
};
