import React from "react";
import { renderWithProvidersUi } from "utils/testConfig";
import { CheckboxFilter } from "../../types";
import CheckboxFilterDropdown from "./index";

const typeFilter: CheckboxFilter = {
  type: "checkbox",
  label: "Type",
  options: [
    { value: "spot", label: "Spot" },
    { value: "futures", label: "Futures" },
    { value: "test", label: "Test" },
  ],
  id: "type",
  value: ["spot", "futures"],
};

describe("components/filters/ZigFilters/filters/CheckboxFilterDropdown", () => {
  it("should show checked count", async () => {
    const onChange = jest.fn();
    const { getByText } = renderWithProvidersUi(
      <CheckboxFilterDropdown filter={typeFilter} resetFilter={onChange} onChange={onChange} />,
    );

    expect(getByText("2")).toBeInTheDocument();
  });

  it('should show "All"', async () => {
    const onChange = jest.fn();
    const { getByText } = renderWithProvidersUi(
      <CheckboxFilterDropdown
        filter={{ ...typeFilter, value: null }}
        resetFilter={onChange}
        onChange={onChange}
      />,
    );

    expect(getByText("All")).toBeInTheDocument();
  });

  it("should show checked value", async () => {
    const onChange = jest.fn();
    const { getByText } = renderWithProvidersUi(
      <CheckboxFilterDropdown
        resetFilter={onChange}
        filter={{ ...typeFilter, value: ["spot"] }}
        onChange={onChange}
      />,
    );

    expect(getByText("Spot")).toBeInTheDocument();
  });
});
