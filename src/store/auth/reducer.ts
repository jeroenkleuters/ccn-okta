// src/store/auth/reducer.js
import { Action } from "../types";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type AuthState = null | {
  user: User;
  token: string;
};

const initialState: AuthState = null;

export default function authSliceReducer(
  state: AuthState = initialState,
  action: Action
): AuthState {
  switch (action.type) {
    case "login": {
      return action.payload;
    }
    case "logout": {
      return null;
    }
    default: {
      return state;
    }
  }
}
