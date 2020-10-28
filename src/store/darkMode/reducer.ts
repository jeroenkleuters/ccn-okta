// src/store/darkMode/reducer.js
import { Action } from "../types";

export type DarkModeState = boolean;

const initialState: DarkModeState = false;

export function darkModeSliceReducer(
  state: DarkModeState = initialState,
  action: Action
): DarkModeState {
  switch (action.type) {
    case "toggle_dark_mode": {
      return !state;
    }
    default: {
      return state;
    }
  }
}
