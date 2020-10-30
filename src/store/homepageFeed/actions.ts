// src/store/homepage/actions.ts

import { ThunkResult } from "../types";
import axios from "axios";
import { PostsResponse } from "../../lib/model";
import { User } from "../auth/reducer";

export function updatePostsResponse(
  resp: PostsResponse,
  postId: number,
  me: User,
  liked: boolean
) {
  return {
    count: resp.count,
    rows: resp.rows.map((post) => {
      if (post.id !== postId) {
        return post;
      } else {
        return {
          ...post,
          post_likes: liked
            ? [
                ...post.post_likes,
                {
                  createdAt: "", // niet heel mooi
                  updatedAt: "", // niet heel mooi
                  developer: me,
                },
              ]
            : post.post_likes.filter((like) => {
                return like.developer.id !== me.id;
              }),
        };
      }
    }),
  };
}

let _cache: {
  [tag: string]: PostsResponse;
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

      // in de redux store updaten
      dispatch({
        type: "post_liked",
        payload: {
          postId,
          me: auth.user,
        },
      });
      for (const tag of Object.keys(_cache)) {
        _cache[tag] = updatePostsResponse(_cache[tag], postId, auth.user, true);
      }

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

      // Dit is niet mooi, dat ik het op twee
      //  verschillende plekken moet updaten. Het is een gevolg
      //  van dat ik de caching op thunk/url-niveau heb gedaan, ipv
      //  in de store. Als ik in de store de cache bijhoudt,
      //  kan ik:
      // 1. Genormaliseerd de entities opslaan, maar hier gaat
      //     mijn voorkeur niet naar uit.
      // 2. Ditzelfde soort "update alle resultaten, per tag", maar dan
      //     in de reducer. Dat zou een "maatwerk" oplossing zijn.
      //     Dit vind ik wel heel erg Redux-achtig, en feature-georienteerd.
      // Een totaal andere oplossing is op url-niveau, maar dan wel met
      //  iets meer infrastructuur, door bijvoorbeeld een library
      //  zoals `react-query` te gebruiken
      dispatch({
        type: "post_disliked",
        payload: {
          postId,
          me: auth.user,
        },
      });
      for (const tag of Object.keys(_cache)) {
        _cache[tag] = updatePostsResponse(
          _cache[tag],
          postId,
          auth.user,
          false
        );
      }

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
