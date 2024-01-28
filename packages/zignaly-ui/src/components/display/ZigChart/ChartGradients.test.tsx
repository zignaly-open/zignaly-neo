import React from "react";
import { ChartGradients } from ".";
import { renderWithProvidersUi } from "../../../utils/testConfig";

describe("ChartGradients component tests", () => {
  it("renders ChartGradients component", () => {
    const { container } = renderWithProvidersUi(<ChartGradients />);
    expect(container).toMatchSnapshot();
  });
});
