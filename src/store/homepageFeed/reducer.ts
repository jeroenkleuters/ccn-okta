// src/store/homepage/reducer.js
import { Action } from "../types";
import { FetchState } from "../../util/fetchstate";
import { PostsResponse } from "../../lib/model";
import { updatePostsResponse } from "./actions";

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
        data: updatePostsResponse(state.data, postId, me, true),
      };
    }
    case "post_disliked": {
      if (state.status !== "success") {
        return state;
      }
      const { postId, me } = action.payload;
      return {
        ...state,
        data: updatePostsResponse(state.data, postId, me, false),
      };
    }
    default: {
      return state;
    }
  }
}
