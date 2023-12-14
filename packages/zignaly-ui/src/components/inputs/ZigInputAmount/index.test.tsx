import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { fireEvent, waitFor } from "@testing-library/react";
import ZigInputAmount from ".";

describe("components/inputs/ZigInputAmount", () => {
  it("should render without crashing", () => {
    const { container } = renderWithProvidersUi(<ZigInputAmount id={"test-id"} />);

    const input = container.querySelector("#test-id") as Element;
    expect(input).toBeVisible();
    const inputStyles = getComputedStyle(input);
    expect(input).toMatchSnapshot();
    expect(inputStyles).toMatchSnapshot();
  });

  it("should change value on input event", () => {
    const { container } = renderWithProvidersUi(<ZigInputAmount id={"test-id"} />);

    const input = container.querySelector("#test-id") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "4" } });
    waitFor(() => {
      expect(input.value).toBe("4");
    });
  });

  it("should call handleMax when max button is clicked", () => {
    const handleMax = jest.fn();
    const { container } = renderWithProvidersUi(
      <ZigInputAmount id={"test-id"} onMax={handleMax} />,
    );

    const maxButton = container.querySelector("#test-id-max-button") as Element;
    fireEvent.click(maxButton);
    waitFor(() => {
      expect(handleMax).toHaveBeenCalled();
    });
  });

  it("should display error message when `error` prop is passed", () => {
    const { container } = renderWithProvidersUi(
      <ZigInputAmount id={"test-id"} error={"Test error"} />,
    );

    const errorMessage = container.querySelector("#test-id-error") as Element;

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Test error");
  });
});
