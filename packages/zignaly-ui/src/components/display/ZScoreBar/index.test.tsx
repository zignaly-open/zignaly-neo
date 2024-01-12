import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { roundScorePct } from "./util";
import ZScoreBar from ".";

describe("components/display/ZScoreBar", () => {
  it("should render", async () => {
    const { getByText } = renderWithProvidersUi(
      <ZScoreBar value={20} max={40} category="profits" />,
    );
    expect(getByText("20")).toBeInTheDocument();
    expect(getByText("/40")).toBeInTheDocument();
  });

  describe("components/display/ZScoreBar/util", () => {
    it("should fix rounding errors", async () => {
      const numbers = [55.56, 18.52, 14.81, 11.11];
      const numbersFixed = roundScorePct(numbers);
      expect(numbersFixed.reduce((n, total) => n + total, 0)).toBe(100);
    });
  });
});
