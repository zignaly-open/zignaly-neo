import React from "react";
import { render, screen } from "@testing-library/react";

import Avatar from ".";

describe("components/display/Avatar", () => {
  describe("renders", () => {
    it("Avatar with small size", () => {
      const { container } = render(<Avatar size={"small"} />);

      const tag = container.querySelector("div");
      expect(tag).toBeVisible();

      expect((container!.firstChild as HTMLElement).classList!.contains("small")).toBe(true);
    });
    it("Avatar with medium size", () => {
      const { container } = render(<Avatar size={"medium"} />);

      const tag = container.querySelector("div");
      expect(tag).toBeVisible();

      expect((container!.firstChild as HTMLElement).classList.contains("medium")).toBe(true);
    });
    it("Avatar with large size", () => {
      const { container } = render(<Avatar size={"large"} />);

      const tag = container.querySelector("div");
      expect(tag).toBeVisible();

      expect((container!.firstChild as HTMLElement).classList.contains("large")).toBe(true);
    });

    it("Avatar with hash", () => {
      const { container } = render(<Avatar hash="0xmyHash" />);

      const tag = container.querySelector("div");
      expect(tag).toBeVisible();
    });

    it("Avatar with image", () => {
      render(<Avatar image="image" />);

      const tag = screen.getByRole("img");
      expect(tag).toBeVisible();

      expect(tag).toHaveAttribute("src", "image");
    });
  });
});
