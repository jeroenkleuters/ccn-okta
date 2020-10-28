// src/index.tsx
import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import { FetchDataCacheProvider } from "./lib/fetchDataCache";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <FetchDataCacheProvider>
          <App />
        </FetchDataCacheProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
