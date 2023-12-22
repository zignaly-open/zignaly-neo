import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { fireEvent, screen } from "@testing-library/react";
import ZigSlider from ".";

describe("components/inputs/ZigSlider", () => {
  const defaultProps = {
    min: 0,
    max: 100,
    value: 50,
    labels: {
      start: "Start Label",
      end: "End Label",
      top: "Top Label",
    },
  };

  it("should render without crashing", () => {
    const { container } = renderWithProvidersUi(<ZigSlider {...defaultProps} prefixId={"test"} />);

    const sliderContainer = container.querySelector("#test__container") as HTMLElement;
    expect(sliderContainer).toBeVisible();
    expect(sliderContainer).toMatchSnapshot();
  });

  it("should display labels", () => {
    renderWithProvidersUi(<ZigSlider {...defaultProps} />);

    const startLabel = screen.getByText("Start Label");
    const endLabel = screen.getByText("End Label");
    const topLabel = screen.getByText("Top Label");

    expect(startLabel).toBeVisible();
    expect(endLabel).toBeVisible();
    expect(topLabel).toBeVisible();
  });

  it("should handle slider value change", () => {
    const onChangeMock = jest.fn();
    renderWithProvidersUi(<ZigSlider {...defaultProps} onChange={onChangeMock} />);

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: 75 } });

    expect(onChangeMock).toHaveBeenCalledWith(expect.anything(), 75, expect.anything());
  });

  it("should display custom formatted labels", () => {
    const customFormat = (value: number) => `Formatted: ${value}%`;
    renderWithProvidersUi(<ZigSlider {...defaultProps} valueLabelFormat={customFormat} />);

    const startLabel = screen.getByText("Formatted: 0%");
    const endLabel = screen.getByText("Formatted: 100%");

    expect(startLabel).toBeVisible();
    expect(endLabel).toBeVisible();
  });
});
