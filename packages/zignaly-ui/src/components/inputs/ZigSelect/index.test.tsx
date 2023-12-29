import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import ZigSelect from ".";

describe("components/inputs/ZigSelect", () => {
  const options = [
    { label: "Option 1", value: 1 },
    { label: "Option 2", value: 2 },
    { label: "Option 3", value: 3 },
  ];

  it("should render without crashing", () => {
    const { container } = renderWithProvidersUi(<ZigSelect options={options} id={"test-id"} />);

    const select = container.querySelector("#test-id") as HTMLElement;
    expect(select).toBeVisible();
    expect(select).toMatchSnapshot();
  });

  it("should open dropdown on click", async () => {
    const { container } = renderWithProvidersUi(<ZigSelect options={options} id={"test-id"} />);

    const dropdownIndicator = container.querySelector("#react-select-test-id-input") as HTMLElement;
    fireEvent.mouseDown(dropdownIndicator);

    await waitFor(() => {
      options.map((optionText) => {
        const option = screen.getByText(optionText.label);
        expect(option).toBeVisible();
      });
    });
  });

  it("should trigger onChange for the selected option", async () => {
    const onChangeMock = jest.fn();
    const { container } = renderWithProvidersUi(
      <ZigSelect options={options} onChange={onChangeMock} id={"test-id"} />,
    );

    const dropdownIndicator = container.querySelector("#react-select-test-id-input") as HTMLElement;
    fireEvent.mouseDown(dropdownIndicator);

    await waitFor(() => {
      const option1 = screen.getByText("Option 1");
      fireEvent.click(option1);
    });

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith(1, expect.anything());
    });
  });

  it("should display error message", () => {
    renderWithProvidersUi(<ZigSelect options={options} error="Invalid option" />);

    const errorMessage = screen.getByText("Invalid option");
    expect(errorMessage).toBeVisible();
  });
});
