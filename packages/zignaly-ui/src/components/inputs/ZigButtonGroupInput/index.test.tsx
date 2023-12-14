import React from "react";
import ZigButtonGroupInput from "./index";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { fireEvent, waitFor } from "@testing-library/react";

const testOptions = [
  {
    id: "test-button1",
    value: "test1",
    label: "button 1",
  },
  {
    id: "test-button2",
    value: "test2",
    label: "button 2",
  },
];

const fiveTestOptions = [
  {
    id: "test-button1",
    value: "test1",
    label: "button 1",
  },
  {
    id: "test-button2",
    value: "test2",
    label: "button 2",
  },
  {
    id: "test-button3",
    value: "test3",
    label: "button 3",
  },
  {
    id: "test-button4",
    value: "test4",
    label: "button 4",
  },
  {
    id: "test-button5",
    value: "test5",
    label: "button 5",
  },
];
let mainValue = "test1";

describe("components/inputs/ZigButtonGroupInput", () => {
  it("should render with 2 options without crashing", async () => {
    const { container } = renderWithProvidersUi(
      <ZigButtonGroupInput value={mainValue} options={testOptions} onChange={() => {}} />,
    );

    const button1 = container.querySelector("#test-button1") as Element;
    const button2 = container.querySelector("#test-button2") as Element;
    expect(container).toMatchSnapshot();
    expect(button1).toBeVisible();
    expect(button2).toBeVisible();
  });

  it("should render with more than 2 options without crashing", async () => {
    const { container } = renderWithProvidersUi(
      <ZigButtonGroupInput value={mainValue} options={fiveTestOptions} onChange={() => {}} />,
    );
    testOptions.forEach(({ id }) => {
      const button = container.querySelector(`#${id}`) as Element;
      expect(button).toBeVisible();
    });
  });

  it("should change active value on click", async () => {
    const { container, rerender } = renderWithProvidersUi(
      <ZigButtonGroupInput
        value={mainValue}
        options={testOptions}
        onChange={(v) => {
          mainValue = v;
        }}
      />,
    );

    const button1 = container.querySelector("#test-button1") as Element;
    const button2 = container.querySelector("#test-button2") as Element;
    expect(button1).toHaveClass("MuiButton-active");
    expect(button2).not.toHaveClass("MuiButton-active");
    fireEvent.click(button2);
    await waitFor(() => {
      rerender(
        <ZigButtonGroupInput
          value={mainValue}
          options={testOptions}
          onChange={(v) => {
            mainValue = v;
          }}
        />,
      );
      const updatedButton1 = container.querySelector("#test-button1") as Element;
      const updatedButton2 = container.querySelector("#test-button2") as Element;
      expect(updatedButton2).toHaveClass("MuiButton-active");
      expect(updatedButton1).not.toHaveClass("MuiButton-active");
    });
  });
});
