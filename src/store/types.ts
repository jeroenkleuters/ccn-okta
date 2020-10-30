// src/store/types.ts
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { Post, PostsResponse } from "../lib/model";
import { AuthState, User } from "./auth/reducer";
import { HomepageFeedState } from "./homepageFeed/reducer";
import { DarkModeState } from "./darkMode/reducer";

export type State = {
  auth: AuthState;
  homepageFeed: HomepageFeedState;
  darkMode: DarkModeState;
};

export type Action =
  | {
      type: "add_post";
      payload: Post;
    }
  | {
      type: "login";
      payload: {
        user: User;
        token: string;
      };
    }
  | {
      type: "toggle_dark_mode";
    }
  | {
      type: "logout";
    }
  | {
      type: "homepage_feed_fetching";
    }
  | {
      type: "homepage_feed_fetched";
      payload: PostsResponse;
    }
  | {
      type: "homepage_feed_error";
      payload: any;
    }
  | {
      type: "post_liked";
      payload: {
        postId: number;
        me: User;
      };
    }
  | {
      type: "post_disliked";
      payload: {
        postId: number;
        me: User;
      };
    };
// and more to be added later...

export type ThunkResult<R = any> = ThunkAction<R, State, void, Action>;

export type AppDispatch = ThunkDispatch<State, void, Action>;
