// src/lib/theme.tsx
import { createContext } from "react";

export type Theme = {
  fontFamily: string;
  colors: {
    backgroundColor: string;
    textColor: string;
    toolbarBackgroundColor: string;
  };
};

export const ThemeContext = createContext<Theme>({
  fontFamily: "sans-serif",
  colors: {
    backgroundColor: "white",
    textColor: "#00c",
    toolbarBackgroundColor: "#555",
  },
});
