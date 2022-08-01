// @ts-nocheck
// Dependencies
import React from "react";
import { render, screen } from "@testing-library/react";

// Component
import Loader from ".";
import { LoaderTypes } from "./types";

describe("components/display/Loader", () => {
  describe("renders", () => {
    describe("LoaderTypes", () => {
      it("Loader with audio type", () => {
        const type = LoaderTypes.AUDIO;
        render(<Loader type={type}>Example Test</Loader>);

        expect(screen.getByTestId(type + "-loading")).toBeVisible;
      });
      it("Loader with bars type", () => {
        const type = LoaderTypes.BARS;
        render(<Loader type={type}>Example Test</Loader>);

        expect(screen.getByTestId(type + "-loading")).toBeVisible;
      });

      it("Loader with circles type", () => {
        const type = LoaderTypes.CIRCLES;
        render(<Loader type={type}>Example Test</Loader>);

        expect(screen.getByTestId(type + "-loading")).toBeVisible;
      });

      it("Loader with falling lines type", () => {
        const type = LoaderTypes.FALLING_LINES;
        const container = render(<Loader type={type}>Example Test</Loader>);

        const tag = container.findByRole("svg");
        expect(tag).toBeVisible;
      });

      it("Loader with grid type", () => {
        const type = LoaderTypes.GRID;

        render(<Loader type={type}>Example Test</Loader>);

        expect(screen.getByTestId(type + "-loading")).toBeVisible;
      });
      it("Loader with oval type", () => {
        const type = LoaderTypes.OVAL;

        render(<Loader type={type}>Example Test</Loader>);

        expect(screen.getByTestId(type + "-loading")).toBeVisible;
      });
      it("Loader with tailspin type", () => {
        const type = LoaderTypes.TAILSPIN;

        render(<Loader type={type}>Example Test</Loader>);

        expect(screen.getByTestId(type + "-loading")).toBeVisible;
      });
      it("Loader with three dots type", () => {
        const type = LoaderTypes.THREE_DOTS;

        render(<Loader type={type}>Example Test</Loader>);

        expect(screen.getByTestId(type + "-loading")).toBeVisible;
      });
    });
    it("with AriaLabel", () => {
      const type = LoaderTypes.THREE_DOTS;

      render(
        <Loader ariaLabel="aria" type={type}>
          Example Test
        </Loader>,
      );

      const tag = screen.getByTestId("three-dots-svg");

      expect(tag).toHaveAttribute("aria-label", "aria");
    });
  });
});
