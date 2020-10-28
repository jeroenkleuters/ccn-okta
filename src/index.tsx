// src/index.tsx
import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// @ts-ignore
import { Security } from "@okta/okta-react";

import { store } from "./store";
import App from "./App";

import { FetchDataCacheProvider } from "./lib/fetchDataCache";
import { oktaConfig } from "./config";

ReactDOM.render(
  <React.StrictMode>
    <Security {...oktaConfig}>
      <BrowserRouter>
        <Provider store={store}>
          <FetchDataCacheProvider>
            <App />
          </FetchDataCacheProvider>
        </Provider>
      </BrowserRouter>
    </Security>
  </React.StrictMode>,
  document.getElementById("root")
);
