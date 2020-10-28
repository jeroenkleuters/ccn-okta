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
    default: {
      return state;
    }
  }
}
