import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { fireEvent, waitFor } from "@testing-library/react";
import ZigSearch from ".";

describe("components/filters/ZigSearch", () => {
  it("should render without crashing", () => {
    const { container } = renderWithProvidersUi(
      <ZigSearch id="test-id" value="" onChange={jest.fn()} />,
    );

    const search = container.querySelector("#test-id") as HTMLElement;
    expect(search).toBeVisible();
    expect(search).toMatchSnapshot();
  });

  it("should expand on click and focus the input", async () => {
    const { container } = renderWithProvidersUi(
      <ZigSearch id="test-id" value="" onChange={jest.fn()} />,
    );

    const search = container.querySelector("#test-id") as HTMLElement;
    fireEvent.click(search);

    const expanded = container.querySelector("#test-id-input") as HTMLElement;
    await waitFor(() => {
      expect(expanded).toBeVisible();
      expect(document.activeElement).toEqual(expanded);
    });
  });

  it("should call onChange when input value is changed", () => {
    const onChange = jest.fn();
    const { container } = renderWithProvidersUi(
      <ZigSearch id="test-id" value="initial" onChange={onChange} />,
    );

    const search = container.querySelector("#test-id") as HTMLElement;
    fireEvent.click(search);

    const input = container.querySelector("#test-id-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "new value" } });
    waitFor(() => {
      expect(onChange).toBeCalledWith("new value");
    });
  });

  it("should call onChange with empty string when reset is clicked", () => {
    const onChange = jest.fn();
    const { container } = renderWithProvidersUi(
      <ZigSearch id="test-id" value="initial" onChange={onChange} />,
    );

    const search = container.querySelector("#test-id") as HTMLElement;
    fireEvent.click(search);

    const reset = container.querySelector("#test-id-input-reset") as HTMLElement;
    fireEvent.click(reset);
    waitFor(() => {
      expect(onChange).toBeCalledWith("");
    });
  });

  it("should collapse when cross is clicked", () => {
    const { container } = renderWithProvidersUi(
      <ZigSearch id="test-id" value="initial" onChange={jest.fn()} />,
    );

    const search = container.querySelector("#test-id") as HTMLElement;
    fireEvent.click(search);

    const cross = container.querySelector("#test-id-close") as HTMLElement;
    fireEvent.click(cross);
    waitFor(() => {
      const expanded = container.querySelector("#test-id-input");
      expect(expanded).not.toBeVisible();
    });
  });
});
