import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { fireEvent, waitFor } from "@testing-library/react";
import ZigInput from ".";

describe("components/inputs/ZigInput", () => {
  it("should render without crashing", () => {
    const { container } = renderWithProvidersUi(<ZigInput id={"test-id"} />);

    const input = container.querySelector("#test-id") as Element;
    expect(input).toBeVisible();
    const inputStyles = getComputedStyle(input);
    expect(input).toMatchSnapshot();
    expect(inputStyles).toMatchSnapshot();
  });

  it("should change value on input event", () => {
    const { container } = renderWithProvidersUi(<ZigInput id={"test-id"} />);

    const input = container.querySelector("#test-id") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Test value" } });
    waitFor(() => {
      expect(input.value).toBe("Test value");
    });
  });

  it("should reveal password when visibility icon is clicked", () => {
    const { container } = renderWithProvidersUi(<ZigInput id={"test-id"} sensitive />);
    const passwordInput = container.querySelector("#test-id") as HTMLInputElement;
    expect(passwordInput.type).toBe("password");

    const visibilityIcon = container.querySelector("#test-id-visibility-icon") as Element;

    fireEvent.click(visibilityIcon);
    waitFor(() => {
      expect(passwordInput.type).toBe("text");
    });
  });

  it("should display error message when `error` prop is passed", () => {
    const { container } = renderWithProvidersUi(<ZigInput id={"test-id"} error={"Test error"} />);

    const errorMessage = container.querySelector("#test-id-error-message") as Element;

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Test error");
  });
});
