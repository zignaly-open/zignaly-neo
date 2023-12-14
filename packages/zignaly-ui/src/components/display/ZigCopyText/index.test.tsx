import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ZigCopyText from ".";

describe("components/display/ZigCopyText", () => {
  it("should render without crashing", () => {
    const { container } = render(<ZigCopyText id="test-id" value="test value" />);

    const input = container.querySelector("#test-id") as HTMLElement;
    expect(input).toBeVisible();
    expect(input).toMatchSnapshot();
  });

  it("should have a copy button", () => {
    const { container } = render(
      <ZigCopyText id="test-id" value="test value" copyElementId="copy-button-id" />,
    );

    const copyButton = container.querySelector("#copy-button-id") as HTMLElement;
    expect(copyButton).toBeInTheDocument();
  });

  it("should call onCopied when copy button is clicked", () => {
    const handleCopied = jest.fn();

    const { container } = render(
      <ZigCopyText
        id="test-id"
        value="test value"
        copyElementId="copy-button-id"
        onCopied={handleCopied}
      />,
    );

    const copyButton = container.querySelector("#copy-button-id") as HTMLElement;

    fireEvent.click(copyButton);

    expect(handleCopied).toHaveBeenCalled();
  });
});
