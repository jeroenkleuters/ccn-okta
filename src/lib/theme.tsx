// src/lib/theme.tsx
import React, { createContext, useState } from "react";

export type Theme = {
  fontFamily: string;
  colors: {
    backgroundColor: string;
    textColor: string;
    toolbarBackgroundColor: string;
    cardBackgroundColor: string;
  };
};

const themes = [
  {
    fontFamily: "sans-serif",
    colors: {
      backgroundColor: "#eee",
      textColor: "#444",
      toolbarBackgroundColor: "#009688",
      cardBackgroundColor: "#fff",
    },
  },
  {
    fontFamily: "sans-serif",
    colors: {
      backgroundColor: "#222",
      textColor: "#eee",
      toolbarBackgroundColor: "#111",
      cardBackgroundColor: "#333",
    },
  },
];

export const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({
  theme: themes[0],
  toggle: () => {
    // noop
  },
});

export function ThemeProvider(props: { children?: React.ReactNode }) {
  const [themeNo, setThemeNo] = useState(0);

  const toggle = () => {
    setThemeNo((themeNo + 1) % themes.length);
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[themeNo], toggle }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
