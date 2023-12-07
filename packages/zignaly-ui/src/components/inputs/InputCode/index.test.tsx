import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { fireEvent, waitFor } from "@testing-library/react";
import InputCode from ".";

describe("components/inputs/InputCode", () => {
  it("should render without crashing", () => {
    const { container } = renderWithProvidersUi(
      <InputCode prefixId={"test"} fields={6} loading={false} onComplete={jest.fn()} />,
    );

    const inputs = container.querySelector("#test__code-input") as Element;
    expect(inputs).toBeVisible();
    const inputsStyles = getComputedStyle(inputs);
    expect(inputs).toMatchSnapshot();
    expect(inputsStyles).toMatchSnapshot();
  });

  it("should dispatch onComplete when all input fields are filled", () => {
    const handleOnComplete = jest.fn();
    const { container } = renderWithProvidersUi(
      <InputCode prefixId={"test"} fields={6} loading={false} onComplete={handleOnComplete} />,
    );
    const inputFields = container.getElementsByTagName("input");
    Array.from(inputFields).forEach((inputFields) => {
      fireEvent.change(inputFields, { target: { value: "1" } });
    });
    waitFor(() => {
      expect(handleOnComplete).toHaveBeenCalled();
    });
  });

  it("should display error message when `error` prop is passed", () => {
    const { container } = renderWithProvidersUi(
      <InputCode
        prefixId={"test"}
        fields={6}
        loading={false}
        onComplete={jest.fn()}
        error="Test error"
      />,
    );

    const errorMessage = container.querySelector("#test__error-message") as Element;
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Test error");
  });
});
