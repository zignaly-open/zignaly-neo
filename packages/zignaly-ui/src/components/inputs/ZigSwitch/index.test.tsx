import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import ZigSwitch from ".";

describe("components/inputs/ZigSwitch", () => {
  it("should render without crashing", () => {
    const { container } = renderWithProvidersUi(<ZigSwitch />);
    const switchContainer = container.querySelector(".MuiSwitch-root") as HTMLElement;
    expect(switchContainer).toBeVisible();
    expect(switchContainer).toMatchSnapshot();
  });

  it("should handle switch state change", async () => {
    const onChangeMock = jest.fn();
    renderWithProvidersUi(<ZigSwitch onChange={onChangeMock} />);
    const switchInput = screen.getByRole("checkbox");
    fireEvent.click(switchInput);

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalled();
    });
  });
});
