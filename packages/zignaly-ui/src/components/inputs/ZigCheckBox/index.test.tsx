import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ZigCheckBox from ".";
import { renderWithProvidersUi } from "../../../utils/testConfig";

describe("components/inputs/ZigCheckBox", () => {
  it("renders correctly with default props", () => {
    const { container } = renderWithProvidersUi(<ZigCheckBox id={"test"} />);
    const checkboxElement = container.querySelector("#test") as Element;
    const checkboxElementStyles = getComputedStyle(checkboxElement);
    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).toMatchSnapshot();
    expect(checkboxElementStyles).toMatchSnapshot();
  });

  it("renders correctly with outlined variant and label", () => {
    renderWithProvidersUi(<ZigCheckBox variant="outlined" label="Test Label" />);
    const checkboxElement = screen.getByRole("checkbox");
    const labelElement = screen.getByText("Test Label");
    expect(checkboxElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(checkboxElement).toMatchSnapshot();
    expect(labelElement).toMatchSnapshot();
  });

  it("handles onChange event", async () => {
    const onChangeMock = jest.fn();
    render(<ZigCheckBox onChange={onChangeMock} />);

    const checkboxElement = screen.getByRole("checkbox");

    fireEvent.click(checkboxElement);

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalled();
    });
  });
});
