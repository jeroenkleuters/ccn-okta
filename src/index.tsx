// src/index.tsx
import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "./store";
import App from "./App";

import { FetchDataCacheProvider } from "./lib/fetchDataCache";
import { MyOktaAuthProvider } from "./lib/okta";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MyOktaAuthProvider>
          <FetchDataCacheProvider>
            <App />
          </FetchDataCacheProvider>
        </MyOktaAuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
