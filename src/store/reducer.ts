import { combineReducers } from "redux";
import authSliceReducer from "./auth/reducer";
import { homepageFeedSliceReducer } from "./homepageFeed/reducer";
import { darkModeSliceReducer } from "./darkMode/reducer";

export const reducer = combineReducers({
  auth: authSliceReducer,
  homepageFeed: homepageFeedSliceReducer,
  darkMode: darkModeSliceReducer,
});
