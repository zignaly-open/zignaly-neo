import React from "react";
import ZigButton from ".";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { fireEvent, waitFor } from "@testing-library/react";

describe("components/inputs/ZigButton", () => {
  describe("renders", () => {
    it("ZigButton small size", async () => {
      const { container } = renderWithProvidersUi(<ZigButton size={"small"} />);

      const button = container.querySelector("button") as Element;
      expect(button).toBeVisible();
      const buttonStyles = getComputedStyle(button);
      expect(button).toMatchSnapshot();
      expect(buttonStyles).toMatchSnapshot();
    });

    it("ZigButton medium size", async () => {
      const { container } = renderWithProvidersUi(<ZigButton size={"medium"} />);

      const button = container.querySelector("button") as Element;
      expect(button).toBeVisible();
      const buttonStyles = getComputedStyle(button);
      expect(button).toMatchSnapshot();
      expect(buttonStyles).toMatchSnapshot();
    });

    it("ZigButton large size", async () => {
      const { container } = renderWithProvidersUi(<ZigButton size={"large"} />);

      const button = container.querySelector("button") as Element;
      expect(button).toBeVisible();
      const buttonStyles = getComputedStyle(button);
      expect(button).toMatchSnapshot();
      expect(buttonStyles).toMatchSnapshot();
    });

    it("ZigButton xlarge size", async () => {
      const { container } = renderWithProvidersUi(<ZigButton size={"xlarge"} />);

      const button = container.querySelector("button") as Element;
      expect(button).toBeVisible();
      const buttonStyles = getComputedStyle(button);
      expect(button).toMatchSnapshot();
      expect(buttonStyles).toMatchSnapshot();
    });

    it("ZigButton contained variant by default", async () => {
      const { container } = renderWithProvidersUi(<ZigButton />);

      const button = container.querySelector("button") as Element;
      expect(button).toBeVisible();
      const buttonStyles = getComputedStyle(button);
      expect(button).toMatchSnapshot();
      expect(buttonStyles).toMatchSnapshot();
    });

    it("ZigButton outlined variant", async () => {
      const { container } = renderWithProvidersUi(<ZigButton variant={"outlined"} />);

      const button = container.querySelector("button") as Element;
      expect(button).toBeVisible();
      const buttonStyles = getComputedStyle(button);
      expect(button).toMatchSnapshot();
      expect(buttonStyles).toMatchSnapshot();
    });

    it("ZigButton text variant", async () => {
      const { container } = renderWithProvidersUi(<ZigButton variant={"text"} />);

      const button = container.querySelector("button") as Element;
      expect(button).toBeVisible();
      const buttonStyles = getComputedStyle(button);
      expect(button).toMatchSnapshot();
      expect(buttonStyles).toMatchSnapshot();
    });
  });
  describe("disable", () => {
    it("ZigButton active test", async () => {
      const onClick = jest.fn();
      const { container } = renderWithProvidersUi(<ZigButton disabled={false} onClick={onClick} />);
      const button = container.querySelector("button") as Element;
      expect(button).not.toHaveClass("Mui-disabled");
      fireEvent.click(button);
      await waitFor(() => {
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });

    it("ZigButton disabled test", async () => {
      const onClick = jest.fn();
      const { container } = renderWithProvidersUi(<ZigButton disabled onClick={onClick} />);
      const button = container.querySelector("button") as Element;
      expect(button).toHaveClass("Mui-disabled");
      fireEvent.click(button);
      await waitFor(() => {
        expect(onClick).toHaveBeenCalledTimes(0);
      });
    });
  });
});
