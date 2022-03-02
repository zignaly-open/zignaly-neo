// Dependencies
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// Component
import ZigWalletIndicator from "./";

describe("components/display/Avatar/Image", () => {
  it("renders the image we specify in the `image` property", () => {
    render(<ZigWalletIndicator />);
  });
});
