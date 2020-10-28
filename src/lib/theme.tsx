// src/lib/theme.tsx
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State, AppDispatch } from "../store/types";

export type Theme = {
  fontFamily: string;
  colors: {
    backgroundColor: string;
    textColor: string;
    toolbarBackgroundColor: string;
    cardBackgroundColor: string;
  };
};

const themes = {
  light: {
    fontFamily: "sans-serif",
    colors: {
      backgroundColor: "#eee",
      textColor: "#444",
      toolbarBackgroundColor: "#009688",
      cardBackgroundColor: "#fff",
    },
  },
  dark: {
    fontFamily: "sans-serif",
    colors: {
      backgroundColor: "#222",
      textColor: "#eee",
      toolbarBackgroundColor: "#111",
      cardBackgroundColor: "#333",
    },
  },
};

export function useTheme() {
  const darkMode = useSelector((state: State) => state.darkMode);
  const dispatch = useDispatch<AppDispatch>();

  const toggle = useCallback(() => {
    dispatch({ type: "toggle_dark_mode" });
  }, [dispatch]);

  return {
    theme: darkMode ? themes.dark : themes.light,
    toggle,
  };
}
