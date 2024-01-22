import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import ZScoreRing from ".";

describe("components/display/ZScoreRing", () => {
  it("should render", async () => {
    const { getByText } = renderWithProvidersUi(
      <ZScoreRing value={90} max={95} category="service" />,
    );
    expect(getByText("90")).toBeInTheDocument();
    expect(getByText("/95")).toBeInTheDocument();
  });
});
