import React from "react";
import { renderWithProvidersUi } from "utils/testConfig";
import SliderFilterDropdown from "./index";
import { SliderFilter as SliderFilterType } from "../../types";

const returnsFilter: SliderFilterType = {
  type: "slider",
  value: [19, 100],
  label: "6 months returns",
  allowNoMin: true,
  allowNoMax: true,
  min: 0,
  max: 100,
  id: "returns",
  primary: true,
};

describe("components/filters/ZigFilters/filters/SliderFilterDropdown", () => {
  it('should show "All"', async () => {
    const onChange = jest.fn();
    const { getByText } = renderWithProvidersUi(
      <SliderFilterDropdown
        filter={{ ...returnsFilter, value: [null, null] }}
        onChange={onChange}
        resetFilter={onChange}
        mobile={false}
      />,
    );

    expect(getByText("All")).toBeInTheDocument();
  });

  it("should show > x%", async () => {
    const onChange = jest.fn();
    const { getByText } = renderWithProvidersUi(
      <SliderFilterDropdown
        filter={{ ...returnsFilter, value: [10, null] }}
        onChange={onChange}
        resetFilter={onChange}
        mobile={false}
      />,
    );

    expect(getByText("> 10%")).toBeInTheDocument();
  });

  it("should show < x%", async () => {
    const onChange = jest.fn();
    const { getByText } = renderWithProvidersUi(
      <SliderFilterDropdown
        filter={{ ...returnsFilter, value: [null, 50] }}
        onChange={onChange}
        resetFilter={onChange}
        mobile={false}
      />,
    );

    expect(getByText("< 50%")).toBeInTheDocument();
  });

  it("should show x%-y%", async () => {
    const onChange = jest.fn();
    const { getByText } = renderWithProvidersUi(
      <SliderFilterDropdown
        filter={returnsFilter}
        onChange={onChange}
        resetFilter={onChange}
        mobile={false}
      />,
    );

    expect(getByText("19%-100%")).toBeInTheDocument();
  });
});
