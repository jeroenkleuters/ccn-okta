// src/index.tsx
import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import { ThemeContext } from "./lib/theme";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeContext.Provider
        value={{
          fontFamily: "sans-serif",
          colors: {
            backgroundColor: "white",
            textColor: "#c00",
            toolbarBackgroundColor: "#555",
          },
        }}
      >
        <App />
      </ThemeContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
