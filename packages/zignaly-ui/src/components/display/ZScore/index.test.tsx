import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import ZScore from ".";

describe("components/display/ZScore", () => {
  it("should render zscore", async () => {
    const { getByText } = renderWithProvidersUi(<ZScore value={90} />);
    expect(getByText("90")).toBeInTheDocument();
  });
});
