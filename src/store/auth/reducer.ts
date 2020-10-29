// src/store/auth/reducer.js
import { Action } from "../types";

export type User = {
  id: number;
  name: string;
  email: string;
};

// loading
// logged in
// logged out

export type AuthState =
  | {
      status: "logged_in";
      token: string;
      user: User;
    }
  | {
      status: "logged_out";
    }
  | {
      status: "loading";
    };

const initialState: AuthState = { status: "loading" };

export default function authSliceReducer(
  state: AuthState = initialState,
  action: Action
): AuthState {
  switch (action.type) {
    case "login": {
      return {
        status: "logged_in",
        ...action.payload,
      };
    }
    case "logout": {
      return { status: "logged_out" };
    }
    default: {
      return state;
    }
  }
}
