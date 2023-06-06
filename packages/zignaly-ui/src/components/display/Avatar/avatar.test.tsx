import React from "react";
import { render, screen } from "@testing-library/react";

import Avatar from ".";

describe("components/display/Avatar", () => {
  describe("renders", () => {
    it("Avatar with small size", () => {
      const { container } = render(<Avatar hash="avsas" size={"small"} />);

      const svg = container.querySelector("svg");
      expect(svg).toBeVisible();
      expect(svg?.getAttribute("width")).toBe("20");
    });
    it("Avatar with medium size", () => {
      const { container } = render(<Avatar hash="avsas" size={"medium"} />);

      const svg = container.querySelector("svg");
      expect(svg).toBeVisible();
      expect(svg?.getAttribute("width")).toBe("26");
    });
    it("Avatar with large size", () => {
      const { container } = render(<Avatar hash="avsas" size={"large"} />);

      const svg = container.querySelector("svg");
      expect(svg).toBeVisible();
      expect(svg?.getAttribute("width")).toBe("36");
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
