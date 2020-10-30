// src/store/homepage/reducer.js
import { Action } from "../types";
import { FetchState } from "../../util/fetchstate";
import { PostsResponse } from "../../lib/model";

export type HomepageFeedState = FetchState<PostsResponse>;

const initialState: HomepageFeedState = {
  status: "loading",
};

export function homepageFeedSliceReducer(
  state: HomepageFeedState = initialState,
  action: Action
): HomepageFeedState {
  switch (action.type) {
    case "homepage_feed_fetching": {
      return {
        status: "loading",
      };
    }
    case "homepage_feed_fetched": {
      return {
        status: "success",
        data: action.payload,
      };
    }
    case "homepage_feed_error": {
      return {
        status: "error",
        error: action.payload,
      };
    }
    case "post_liked": {
      if (state.status !== "success") {
        return state;
      }
      const { postId, me } = action.payload;
      return {
        ...state,
        data: {
          count: state.data.count,
          rows: state.data.rows.map((post) => {
            if (post.id !== postId) {
              return post;
            } else {
              return {
                ...post,
                post_likes: [
                  ...post.post_likes,
                  {
                    createdAt: "", // niet heel mooi
                    updatedAt: "", // niet heel mooi
                    developer: me,
                  },
                ],
              };
            }
          }),
        },
      };
    }
    case "post_disliked": {
      if (state.status !== "success") {
        return state;
      }
      const { postId, me } = action.payload;
      return {
        ...state,
        data: {
          count: state.data.count,
          rows: state.data.rows.map((post) => {
            if (post.id !== postId) {
              return post;
            } else {
              return {
                ...post,
                post_likes: post.post_likes.filter((like) => {
                  return like.developer.id !== me.id;
                }),
              };
            }
          }),
        },
      };
    }
    default: {
      return state;
    }
  }
}
