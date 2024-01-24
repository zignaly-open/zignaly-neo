import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import ZScoreBar from ".";

describe("components/display/ZScoreBar", () => {
  it("should render", async () => {
    const { getByText } = renderWithProvidersUi(
      <ZScoreBar value={20} max={40} category="profits" />,
    );
    expect(getByText("20")).toBeInTheDocument();
    expect(getByText("/40")).toBeInTheDocument();
  });
});
