import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import ZigRisk from ".";

describe("components/display/ZigRisk", () => {
  it("should render risk", async () => {
    let view = renderWithProvidersUi(<ZigRisk value={0} />);
    expect(view.getByText("Very risky")).toBeInTheDocument();

    view = renderWithProvidersUi(<ZigRisk value={6} />);
    expect(view.getByText("Risky")).toBeInTheDocument();

    view = renderWithProvidersUi(<ZigRisk value={25} />);
    expect(view.getByText("Very low risk")).toBeInTheDocument();
  });
});
