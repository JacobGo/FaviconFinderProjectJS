import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import { render } from "../util/test-utils";
import { FileUpload } from "./FileUpload";

let testFile: File | undefined;
const setFile = (file: File | undefined) => {
  testFile = file;
};

it("submits a file", () => {
  render(<FileUpload setFile={setFile} />);

  fireEvent.change(screen.getByTestId("uploader"), {
    target: {
      files: [
        new File(["header,header\nitem,item"], "test.csv", {
          type: "text/plain"
        })
      ]
    }
  });

  expect(testFile?.name).toBe("test.csv");
});
it("handles no files", () => {
  render(<FileUpload setFile={setFile} />);

  fireEvent.change(screen.getByTestId("uploader"), {
    target: {
      files: []
    }
  });

  expect(testFile).toBeUndefined();
});
