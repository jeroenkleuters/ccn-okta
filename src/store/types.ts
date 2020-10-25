// src/store/types.ts

import { Post } from "../lib/model";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type State = {
  user?: User;
  token?: string;
  homepageFeed: Post[];
};

export type Action =
  | {
      type: "add_post";
      payload: Post;
    }
  | {
      type: "login";
      payload: {
        token: string;
        user: User;
      };
    };
// and more to be added later...
