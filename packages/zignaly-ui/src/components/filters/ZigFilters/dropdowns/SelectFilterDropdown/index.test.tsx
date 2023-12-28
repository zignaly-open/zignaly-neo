import React from "react";
import { renderWithProvidersUi } from "utils/testConfig";
import { SelectFilter as SelectFilterType } from "../../types";
import SliderFilterDropdown from "./index";

const coinFilter: SelectFilterType = {
  type: "select",
  label: "Coin",
  options: [
    { value: null, label: "All" },
    { value: "USDT", label: "USDT" },
    { value: "USDC", label: "USDC" },
  ],
  id: "coin",
  value: null,
  primary: true,
};

describe("components/filters/ZigFilters/filters/SelectFilterDropdown", () => {
  it('should show "All"', async () => {
    const onChange = jest.fn();
    const { getByText } = renderWithProvidersUi(
      <SliderFilterDropdown
        filter={coinFilter}
        onChange={onChange}
        resetFilter={onChange}
        mobile={false}
      />,
    );

    expect(getByText("All")).toBeInTheDocument();
  });
});
