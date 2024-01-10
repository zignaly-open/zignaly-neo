import React from "react";
import CheckBoxFilter from ".";
import { CheckboxFilter as CheckboxFilterType } from "../../types";
import { renderWithProvidersUi } from "utils/testConfig";
import { fireEvent } from "@testing-library/react";

const typeFilter: CheckboxFilterType = {
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

describe("components/filters/CheckBoxFilter", () => {
  it("should call onChange with new filter", async () => {
    const onChange = jest.fn();
    const { container } = renderWithProvidersUi(
      <CheckBoxFilter filter={typeFilter} onChange={onChange} />,
    );
    fireEvent.click(container.querySelector("#filter-checkbox-type__option-1")!);
    expect(onChange).toBeCalledWith({ ...typeFilter, value: ["spot"] });

    fireEvent.click(container.querySelector("#filter-checkbox-type__option-2")!);
    expect(onChange).toBeCalledWith({ ...typeFilter, value: null });
  });

  it("should call handle null value", async () => {
    const onChange = jest.fn();
    const testFilter = { ...typeFilter, value: null };
    const { container } = renderWithProvidersUi(
      <CheckBoxFilter filter={testFilter} onChange={onChange} />,
    );
    fireEvent.click(container.querySelector("#filter-checkbox-type__option-1")!);
    expect(onChange).toBeCalledWith({ ...typeFilter, value: ["spot", "test"] });
  });
});
