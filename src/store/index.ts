// src/store/index.ts
import { createStore } from "redux";
import { reducer } from "./reducer";

const enhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  : (x: any) => x;

export const store = createStore(reducer, enhancer);
