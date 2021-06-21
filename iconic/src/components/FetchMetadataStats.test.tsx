import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import React from "react";
import { FetchMetadata } from "../hooks/useFetchFavicons";
import { render } from "../util/test-utils";
import { FetchMetadataStats } from "./FetchMetadataStats";

test("renders without crashing", () => {
  const correctMock: FetchMetadata = {
    successfulCount: 1,
    unsuccessfulCount: 0,
    timeElapsed: 1010
  };
  render(<FetchMetadataStats fetchMetadata={correctMock} />);
  expect(screen.getByTestId("timeElapsed")).toHaveTextContent(/1.01*seconds/);
});
