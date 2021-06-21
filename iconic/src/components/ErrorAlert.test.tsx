import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import React from "react";
import { render } from "../util/test-utils";
import { ErrorAlert, ErrorType } from "./ErrorAlert";

test("shows server error", () => {
  const serverErrorProps = {
    error: Error("something broke!"),
    type: ErrorType.ServerError
  };
  render(<ErrorAlert {...serverErrorProps} />);
  expect(screen.getByTestId("errorAlert")).toHaveTextContent(/Server Error/);
});

test("shows parsing error", () => {
  const parsingErrorProps = {
    error: Error("something broke!"),
    type: ErrorType.ParsingError
  };
  render(<ErrorAlert {...parsingErrorProps} />);
  expect(screen.getByTestId("errorAlert")).toHaveTextContent(/Parsing Error/);
});
