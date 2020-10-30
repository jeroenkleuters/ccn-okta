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

export const likePost = (postId: number): ThunkResult => {
  return async function thunk(dispatch, getState) {
    const { auth } = getState();
    if (!auth) return;

    try {
      const url = `https://codaisseur-coders-network-okta.herokuapp.com/posts/${postId}/likes`;
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      // ! optimistic update
      const req = axios.post(url, {}, config);

      dispatch({
        type: "post_liked",
        payload: {
          postId,
          me: auth.user,
        },
      });

      await req;
      // TODO: invalidation/refresh
    } catch (error) {
      // do something?
    }
  };
};

export const dislikePost = (postId: number): ThunkResult => {
  return async function thunk(dispatch, getState) {
    const { auth } = getState();
    if (!auth) return;

    try {
      const url = `https://codaisseur-coders-network-okta.herokuapp.com/posts/${postId}/likes`;
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      // ! optimistic update
      const req = axios.delete(url, config);

      dispatch({
        type: "post_disliked",
        payload: {
          postId,
          me: auth.user,
        },
      });

      await req;
      // TODO: invalidation/refresh
    } catch (error) {
      // do something?
    }
  };
};

// cache zelf updaten (en dan hopen dat het overeenkomt met de server)
// -> snappy UX

// cache invalidaten (en opnieuw ophalen)
// -> business critical

// -> optimistic updates:
//   - update cache, zelfs nog voordat de api request is geslaagd
//   - cache invalidation
//   - ...?
