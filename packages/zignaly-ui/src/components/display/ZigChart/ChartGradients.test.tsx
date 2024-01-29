import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import ThemeChartGradients from "./ThemeChartGradients";

describe("ChartGradients component tests", () => {
  it("renders ChartGradients component", () => {
    const { container } = renderWithProvidersUi(<ThemeChartGradients />);
    expect(container).toMatchSnapshot();
  });
});
