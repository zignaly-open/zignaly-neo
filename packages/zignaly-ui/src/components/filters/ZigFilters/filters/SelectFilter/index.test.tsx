import React from "react";
import { renderWithProvidersUi } from "utils/testConfig";
import SelectFilter from "./index";
import { fireEvent } from "@testing-library/react";
import { SelectFilter as SelectFilterType } from "../../types";

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

describe("components/filters/ZigFilters/filters/SelectFilter", () => {
  it("should call onChange with new filter", async () => {
    const onChange = jest.fn();
    const { container } = renderWithProvidersUi(
      <SelectFilter filter={coinFilter} onChange={onChange} />,
    );

    fireEvent.click(container.querySelector("#filter-select-coin__option-1")!);
    expect(onChange).toBeCalledWith({ ...coinFilter, value: "USDT" });
  });
});
