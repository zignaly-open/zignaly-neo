import React from "react";
import ZigProgressBar from "./index";
import { renderWithProvidersUi } from "../../../utils/testConfig";

describe("components/display/ZigProgressBar", () => {
  it("renders", async () => {
    const { container } = renderWithProvidersUi(
      <ZigProgressBar className={"test-class"} value={10} />,
    );

    const progressBar = container.querySelector(".test-class") as Element;
    expect(progressBar).toBeVisible();
    const progressBarStyles = getComputedStyle(progressBar);
    expect(progressBar).toMatchSnapshot();
    expect(progressBarStyles).toMatchSnapshot();
  });
});
