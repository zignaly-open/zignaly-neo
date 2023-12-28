import React from "react";
import { renderWithProvidersUi, resizeScreenSize } from "../../../utils/testConfig";
import { fireEvent, waitFor, screen, within } from "@testing-library/react";
import { CheckboxFilter, SliderFilter as SliderFilterType } from "./types";
import ZigFilters from ".";
import { coinFilter, filters, returnsFilter, typeFilter } from "./test/filters";

describe("components/filters/ZigFilters", () => {
  describe("on md", () => {
    it("should render all primary filters", async () => {
      resizeScreenSize(900);
      const onChange = jest.fn();
      const testFilters = filters.map((filter) => ({ ...filter, primary: true }));
      const { container } = renderWithProvidersUi(
        <ZigFilters defaultFilters={testFilters} filters={testFilters} onChange={onChange} />,
      );
      const returnsDropdown = container.querySelector("#filters__dropdown-returns-container");
      expect(returnsDropdown).toBeInTheDocument();
      const coinsDropdown = container.querySelector("#filters__select-coin-container");
      expect(coinsDropdown).toBeInTheDocument();
      const checkboxDropdown = container.querySelector("#filters__checkbox-type-container");
      expect(checkboxDropdown).toBeInTheDocument();
    });

    it("should render all secondary filters", async () => {
      resizeScreenSize(900);
      const onChange = jest.fn();
      const testFilters = filters.map((filter) => ({ ...filter, primary: false }));
      const { container } = renderWithProvidersUi(
        <ZigFilters defaultFilters={testFilters} filters={testFilters} onChange={onChange} />,
      );
      const multiDropdown = container.querySelector("#filters__multi-dropdown-container");
      fireEvent.click(multiDropdown!);
      await waitFor(() => {
        expect(document.querySelector("#filter-slider-returns__label")).toBeInTheDocument();
        expect(document.querySelector("#filter-checkbox-type__label")).toBeInTheDocument();
        expect(document.querySelector("#filter-select-coin__label")).toBeInTheDocument();
      });
    });

    it("should filter", async () => {
      resizeScreenSize(900);
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

  describe("on sm", () => {
    beforeEach(() => {
      resizeScreenSize(600);
    });

    it("should render primary filters in multi dropdown", async () => {
      const onChange = jest.fn();
      const { container } = renderWithProvidersUi(
        <ZigFilters defaultFilters={filters} filters={filters} onChange={onChange} />,
      );
      const returnsDropdown = container.querySelector("#filters__dropdown-returns-container");
      expect(returnsDropdown).not.toBeInTheDocument();
      const coinsDropdown = container.querySelector("#filters__select-coin-container");
      expect(coinsDropdown).not.toBeInTheDocument();
      const checkboxDropdown = container.querySelector("#filters__checkbox-type-container");
      expect(checkboxDropdown).not.toBeInTheDocument();
      const multiDropdown = container.querySelector("#filters__multi-dropdown-mobile");
      fireEvent.click(multiDropdown!);
      await waitFor(() => {
        expect(
          document.querySelector("#filters__accordion-filter-header-returns"),
        ).toBeInTheDocument();
        expect(
          document.querySelector("#filters__accordion-filter-header-type"),
        ).toBeInTheDocument();
        expect(
          document.querySelector("#filters__accordion-filter-header-coin"),
        ).toBeInTheDocument();
      });
    });

    it("should render select mobile filter", async () => {
      const onChange = jest.fn();
      const testFilters = [{ ...coinFilter, mobile: true }];
      const { container } = renderWithProvidersUi(
        <ZigFilters defaultFilters={testFilters} filters={testFilters} onChange={onChange} />,
      );
      fireEvent.click(container.querySelector("#filters__button-coin")!);
      expect(document.querySelector(".MuiDrawer-paperAnchorBottom")).toBeVisible();

      fireEvent.click(document.querySelector("#filters__multi-dropdown-show")!);
      waitFor(() => {
        expect(document.querySelector(".MuiDrawer-paperAnchorBottom")).not.toBeVisible();
      });
    });

    it("should render slider mobile filter", async () => {
      const onChange = jest.fn();
      const testFilters = [{ ...returnsFilter, mobile: true }];
      const { container } = renderWithProvidersUi(
        <ZigFilters defaultFilters={testFilters} filters={testFilters} onChange={onChange} />,
      );
      expect(container.querySelector("#filters__button-returns")).toBeInTheDocument();
    });

    it("should render checkbox mobile filter", async () => {
      const onChange = jest.fn();
      const testFilters = [{ ...typeFilter, mobile: true }];
      const { container } = renderWithProvidersUi(
        <ZigFilters defaultFilters={testFilters} filters={testFilters} onChange={onChange} />,
      );
      expect(container.querySelector("#filters__button-type")).toBeInTheDocument();
    });
  });
});
