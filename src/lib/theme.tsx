// src/lib/theme.tsx
import React, { createContext, useState } from "react";

export type Theme = {
  fontFamily: string;
  colors: {
    backgroundColor: string;
    textColor: string;
    toolbarBackgroundColor: string;
  };
};

const initialTheme = {
  fontFamily: "sans-serif",
  colors: {
    backgroundColor: "white",
    textColor: "#00c",
    toolbarBackgroundColor: "#555",
  },
};

export const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({
  theme: initialTheme,
  toggle: () => {
    // noop
  },
});

export function ThemeProvider(props: { children?: React.ReactNode }) {
  const [theme, setTheme] = useState(initialTheme);

  const toggle = () => {
    // TODO: implement this somehow
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
