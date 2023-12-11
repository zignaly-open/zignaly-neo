import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import ZigDropdown from ".";

describe("components/ZigDropdown", () => {
  const options = [
    { id: "option1", label: "Option 1", onClick: jest.fn() },
    { id: "option2", label: "Option 2", onClick: jest.fn() },
  ];

  const DropdownComponent = () => <div>Component</div>;

  it("should render without crashing", () => {
    const { container } = renderWithProvidersUi(
      <ZigDropdown id="test-id" component={DropdownComponent} options={options} />,
    );

    const dropdown = container.querySelector("#test-id-container") as HTMLElement;
    expect(dropdown).toBeVisible();
    expect(dropdown).toMatchSnapshot();
  });

  it("should open dropdown on click", () => {
    renderWithProvidersUi(
      <ZigDropdown id="test-id" component={DropdownComponent} options={options} />,
    );

    const dropdown = screen.getByRole("button");
    fireEvent.click(dropdown);

    const listItem = screen.getByText(options[0].label);
    expect(listItem).toBeVisible();
  });

  it("should trigger onClick for the option when option is clicked", async () => {
    renderWithProvidersUi(
      <ZigDropdown id="test-id" component={DropdownComponent} options={options} />,
    );

    const dropdown = screen.getByRole("button");
    fireEvent.click(dropdown);

    const listItem = screen.getByText(options[0].label);
    fireEvent.click(listItem);

    await waitFor(() => {
      expect(options[0].onClick).toHaveBeenCalled();
    });
  });

  it("should display component", () => {
    renderWithProvidersUi(
      <ZigDropdown id="test-id" component={DropdownComponent} options={options} />,
    );

    const component = screen.getByText("Component");
    expect(component).toBeVisible();
  });
});
