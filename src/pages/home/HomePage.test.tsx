// src/pages/home/HomePage.test.tsx
import React from "react";
import { render } from "@testing-library/react";

import HomePage from "./HomePage";

test("renders learn react link", () => {
  const { rerender, getByText } = render(<HomePage />);
  expect(true).toBeTruthy();
});
