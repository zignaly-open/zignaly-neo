import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import ZigAutocomplete from ".";

describe("components/ZigAutocomplete", () => {
  const options = ["Option 1", "Option 2", "Option 3"];

  it("should render without crashing", () => {
    const { container } = renderWithProvidersUi(<ZigAutocomplete id="test-id" options={options} />);

    const autocomplete = container.querySelector("#test-id") as HTMLElement;
    expect(autocomplete).toBeVisible();
    expect(autocomplete).toMatchSnapshot();
  });

  it("should open dropdown on focus", () => {
    renderWithProvidersUi(<ZigAutocomplete id="test-id" options={options} />);

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    const listItem = screen.getByText(options[0]);
    expect(listItem).toBeVisible();
  });

  it("should select item on click", () => {
    const handleChange = jest.fn();
    renderWithProvidersUi(
      <ZigAutocomplete id="test-id" options={options} onChange={handleChange} />,
    );

    const input = screen.getByRole("combobox") as HTMLInputElement;
    fireEvent.focus(input);

    const listItem = screen.getByText(options[0]);
    fireEvent.click(listItem);

    waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
      expect(input.value).toBe(options[0]);
    });
  });

  it("should display error message when `error` prop is passed", async () => {
    renderWithProvidersUi(<ZigAutocomplete id="test-id" error="Test error" options={options} />);

    const input = screen.getByRole("combobox") as HTMLInputElement;
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByText("Test error")).toBeInTheDocument();
    });
  });
});
