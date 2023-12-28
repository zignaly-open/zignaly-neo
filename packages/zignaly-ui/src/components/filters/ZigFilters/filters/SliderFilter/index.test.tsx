import React from "react";
import SliderFilter from ".";
import { SliderFilter as SliderFilterType } from "../../types";
import { renderWithProvidersUi } from "utils/testConfig";
import { fireEvent } from "@testing-library/react";

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

describe("components/filters/SliderFilter", () => {
  it("should call onChange with new filter", async () => {
    const onChange = jest.fn();
    const { container } = renderWithProvidersUi(
      <SliderFilter filter={returnsFilter} onChange={onChange} />,
    );
    fireEvent.change(container.querySelector("input")!, {
      target: { value: 20 },
    });
    expect(onChange).toBeCalledWith({ ...returnsFilter, value: [20, 100] });
  });

  it("should handle Min", async () => {
    const onChange = jest.fn();
    const { container } = renderWithProvidersUi(
      <SliderFilter filter={{ ...returnsFilter, value: [null, 12] }} onChange={onChange} />,
    );

    const value1 = container.querySelector("#filter-slider-returns__value-1");
    expect(value1).toHaveTextContent("Min");

    const value2 = container.querySelector("#filter-slider-returns__value-2");
    expect(value2).toHaveTextContent("12");
  });

  it("should handle Max", async () => {
    const onChange = jest.fn();
    const { container } = renderWithProvidersUi(
      <SliderFilter filter={{ ...returnsFilter, value: [1, null] }} onChange={onChange} />,
    );

    const value1 = container.querySelector("#filter-slider-returns__value-1");
    expect(value1).toHaveTextContent("1");

    const value2 = container.querySelector("#filter-slider-returns__value-2");
    expect(value2).toHaveTextContent("Max");
  });

  it("should handle Min and Max", async () => {
    const onChange = jest.fn();
    const { container } = renderWithProvidersUi(
      <SliderFilter filter={{ ...returnsFilter, value: [null, null] }} onChange={onChange} />,
    );

    const value1 = container.querySelector("#filter-slider-returns__value-1");
    expect(value1).toHaveTextContent("Min");

    const value2 = container.querySelector("#filter-slider-returns__value-2");
    expect(value2).toHaveTextContent("Max");
  });

  it("should handle sliding to min/max", async () => {
    const onChange = jest.fn();
    const { container } = renderWithProvidersUi(
      <SliderFilter filter={{ ...returnsFilter, value: [0, 100] }} onChange={onChange} />,
    );

    const inputs = container.querySelectorAll("input");
    fireEvent.change(inputs[0]!, {
      target: { value: -1 },
    });

    fireEvent.change(inputs[1]!, {
      target: { value: 101 },
    });

    const value1 = container.querySelector("#filter-slider-returns__value-1");
    expect(value1).toHaveTextContent("Min");

    const value2 = container.querySelector("#filter-slider-returns__value-2");
    expect(value2).toHaveTextContent("Max");
  });
});
