import "@testing-library/jest-dom";
import React from "react";
import { App } from "./App";
import { render } from "./util/test-utils";

test("renders without crashing", () => {
  render(<App />);
});
