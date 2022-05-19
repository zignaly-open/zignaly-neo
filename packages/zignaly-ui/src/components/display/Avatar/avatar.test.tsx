// @ts-nocheck
// Dependencies
import React from "react";
import { render, screen } from "@testing-library/react";

// Component
import Avatar from ".";

describe("components/display/Avatar", () => {
  describe("renders", () => {
    it("Avatar with small size", () => {
      const { container } = render(<Avatar size={"small"}>Example Test</Avatar>);

      const tag = container.querySelector("div");
      expect(tag).toBeVisible();

      expect(container.firstChild.classList.contains("small")).toBe(true);
    });
    it("Avatar with medium size", () => {
      const { container } = render(<Avatar size={"medium"}>Example Test</Avatar>);

      const tag = container.querySelector("div");
      expect(tag).toBeVisible();

      expect(container.firstChild.classList.contains("medium")).toBe(true);
    });
    it("Avatar with large size", () => {
      const { container } = render(<Avatar size={"large"}>Example Test</Avatar>);

      const tag = container.querySelector("div");
      expect(tag).toBeVisible();

      expect(container.firstChild.classList.contains("large")).toBe(true);
    });

    it("Avatar with hash", () => {
      const { container } = render(<Avatar hash="0xmyHash">Example Test</Avatar>);

      const tag = container.querySelector("div");
      expect(tag).toBeVisible();
    });


    it("Avatar with image", () => {
      render(<Avatar image="image">Example Test</Avatar>);

      const tag = screen.getByRole("img");
      expect(tag).toBeVisible();

      expect(tag).toHaveAttribute("src", "image");
    });
  });
});
