// src/index.tsx
import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./lib/theme";
import { FetchDataCacheProvider } from "./lib/fetchDataCache";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <FetchDataCacheProvider>
          <App />
        </FetchDataCacheProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
