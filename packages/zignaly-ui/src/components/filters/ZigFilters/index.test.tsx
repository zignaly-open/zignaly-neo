import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { fireEvent, waitFor, screen, within } from "@testing-library/react";
import CheckBoxFilter from "./filters/CheckBoxFilter";
import {
  CheckboxFilter,
  SelectFilter,
  SliderFilter as SliderFilterType,
  ZigFiltersType,
} from "./types";
import ZigFilters from ".";
import SliderFilter from "./filters/SliderFilter";

const returnsFilter: SliderFilterType = {
  type: "slider",
  value: [19, 100],
  label: "6 months returns",
  allowNoMin: true,
  allowNoMax: true,
  min: 0,
  max: 100,
  id: "returns",
  showInBar: true,
};

const coinFilter: SelectFilter = {
  type: "select",
  label: "Coin",
  options: [
    { value: null, label: "All" },
    { value: "USDT", label: "USDT" },
    { value: "USDC", label: "USDC" },
  ],
  id: "coin",
  value: null,
  showInBar: true,
};

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

const filters: ZigFiltersType = [returnsFilter, coinFilter, typeFilter];

describe("components/filters/ZigFilters", () => {
  describe("CheckBoxFilter", () => {
    // todo: uncomment when checkbox is replaced with ZigCheckBox
    // it("filters", async () => {
    //   const onChange = jest.fn();
    //   const { container } = renderWithProvidersUi(
    //     <CheckBoxFilter filter={typeFilter} onChange={onChange} />,
    //   );
    //   const label = container.querySelector("#filter-checkbox_type__label");
    //   expect(label).toHaveTextContent("Type");
    //   const options = container.querySelectorAll("label");
    //   expect(options.length).toBe(typeFilter.options.length);
    //   const checkbox2 = options[1].querySelector("input");
    //   expect(checkbox2?.checked).toBe(true);
    //   const checkbox3 = options[2].querySelector("input");
    //   expect(checkbox3?.checked).toBe(false);
    //   fireEvent.click(options[1]);
    //   await waitFor(() => {
    //     expect(onChange).toBeCalledWith({ ...typeFilter, value: ["spot"] });
    //   });
    // });
  });

  describe("SliderFilter", () => {
    it("filters", async () => {
      const onChange = jest.fn();
      const { container } = renderWithProvidersUi(
        <SliderFilter filter={coinFilter} onChange={onChange} />,
      );

      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
      // todo: mock slider
    });

    it("handle Min", async () => {
      const onChange = jest.fn();
      const { container } = renderWithProvidersUi(
        <SliderFilter filter={{ ...returnsFilter, value: [null, 12] }} onChange={onChange} />,
      );

      const value1 = container.querySelector("#filter-slider_returns__value-1");
      expect(value1).toHaveTextContent("Min");

      const value2 = container.querySelector("#filter-slider_returns__value-2");
      expect(value2).toHaveTextContent("12");
    });

    it("handle Max", async () => {
      const onChange = jest.fn();
      const { container } = renderWithProvidersUi(
        <SliderFilter filter={{ ...returnsFilter, value: [1, null] }} onChange={onChange} />,
      );

      const value1 = container.querySelector("#filter-slider_returns__value-1");
      expect(value1).toHaveTextContent("1");

      const value2 = container.querySelector("#filter-slider_returns__value-2");
      expect(value2).toHaveTextContent("Max");
    });

    it("handle Min and Max", async () => {
      const onChange = jest.fn();
      const { container } = renderWithProvidersUi(
        <SliderFilter filter={{ ...returnsFilter, value: [null, null] }} onChange={onChange} />,
      );

      const value1 = container.querySelector("#filter-slider_returns__value-1");
      expect(value1).toHaveTextContent("Min");

      const value2 = container.querySelector("#filter-slider_returns__value-2");
      expect(value2).toHaveTextContent("Max");
    });
  });

  describe("ZigFilters", () => {
    it("filters", async () => {
      const onChange = jest.fn();

      const customFilters = filters.map((filter) => {
        if (filter.id === "returns") {
          return { ...filter, value: [null, 12] } as SliderFilterType;
        } else if (filter.id === "type") {
          return { ...filter, value: ["test"] } as CheckboxFilter;
        } else {
          return filter;
        }
      });

      const { container } = renderWithProvidersUi(
        <ZigFilters defaultFilters={filters} filters={customFilters} onChange={onChange} />,
      );

      // Reset returns slider
      const returnsDropdown = container.querySelector("#filters__dropdown-returns-container");
      expect(returnsDropdown).toBeInTheDocument();
      fireEvent.click(returnsDropdown!);
      const returnsReset = within(screen.getByRole("presentation")).getByText("Reset");
      fireEvent.click(returnsReset!);
      await waitFor(() => {
        expect(onChange).toBeCalledWith([
          returnsFilter,
          coinFilter,
          expect.objectContaining({
            ...typeFilter,
            value: ["test"],
          }),
        ]);
      });

      // Reset multi filters dropdown
      const multiDropdown = container.querySelector("#filters__multi-dropdown-container");
      expect(multiDropdown).toBeInTheDocument();
      fireEvent.click(multiDropdown!);
      const multiReset = within(screen.getByRole("presentation")).getByText("Reset");
      fireEvent.click(multiReset!);

      await waitFor(() => {
        expect(onChange).toHaveBeenLastCalledWith([
          expect.objectContaining({
            ...returnsFilter,
            value: [null, 12],
          }),
          coinFilter,
          typeFilter,
        ]);
      });

      // Reset all
      const resetAll = container.querySelector("#filters__reset-all");
      fireEvent.click(resetAll!);

      await waitFor(() => {
        expect(onChange).toBeCalledWith(filters);
      });
    });
  });
});
