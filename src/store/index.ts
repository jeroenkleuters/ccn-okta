// src/store/index.ts
import { createStore, compose, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { reducer } from "./reducer";

const devToolsEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  : (x: any) => x;

const enhancer = compose(applyMiddleware(ReduxThunk), devToolsEnhancer);

export const store = createStore(reducer, enhancer);
