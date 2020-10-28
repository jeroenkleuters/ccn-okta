// src/store/homepage/actions.ts

import { ThunkResult } from "../types";
import axios from "axios";

const _cache: {
  [tag: string]: any;
} = {};

export const fetchPostsForTag = (tag: string): ThunkResult => {
  return async (dispatch, getState) => {
    if (_cache[tag]) {
      dispatch({
        type: "homepage_feed_fetched",
        payload: _cache[tag],
      });
    } else {
      dispatch({
        type: "homepage_feed_fetching",
      });
      try {
        const res = await axios.get(
          "https://codaisseur-coders-network-okta.herokuapp.com/posts?tag=" +
            tag
        );
        dispatch({
          type: "homepage_feed_fetched",
          payload: _cache[tag] = res.data,
        });
      } catch (error) {
        dispatch({
          type: "homepage_feed_error",
          payload: error,
        });
      }
    }
  };
};
