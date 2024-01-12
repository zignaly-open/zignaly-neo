import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import ZScore from ".";
import { roundScorePct } from "./util";

describe("components/display/ZScoreBar", () => {
  // it("should render zscore", async () => {
  //   const { getByText } = renderWithProvidersUi(<ZScore value={90} />);
  //   expect(getByText("90")).toBeInTheDocument();
  // });

  it("should render zscore", async () => {
    const numbers = [55.56, 18.52, 14.81, 11.11];
    const numbersFixed = roundScorePct(numbers);
    expect(numbersFixed.reduce((n, total) => n + total, 0)).toBe(100);
  });
});
