import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import React from "react";
import { render } from "../util/test-utils";
import { DownloadList } from "./DownloadList";

test("downloads favicon list csv", () => {
  window.URL.createObjectURL = jest.fn();
  window.URL.revokeObjectURL = jest.fn();
  HTMLAnchorElement.prototype.click = jest.fn();

  render(
    <DownloadList
      faviconsList={[
        {
          number: 1,
          domain: "apple.com",
          favicon: "https://www.apple.com/favicon.ico"
        }
      ]}
    />
  );
  const button = screen.getByTestId("downloadList");
  button.click();

  const file = new File(
    ["number,domain,favicon\n1,apple.com,https://www.apple.com/favicon.ico"],
    "favicons.csv",
    { type: "text/plain" }
  );
  expect(window.URL.createObjectURL).toBeCalledWith(file);
});

test("disabled when favicon list is empty", () => {
  render(<DownloadList faviconsList={[]} />);
  expect(screen.getByTestId("downloadList")).toHaveAttribute("disabled");
});
