import { renderHook } from "@testing-library/react";
import { useChartData } from "./hooks";
import { ChartGradientColor } from "./types";

jest.mock("./ZigChart/util", () => ({
  useChartColor: jest.fn(() => ({
    green: "greenColor",
    red: "redColor",
  })),
}));

describe("useChartData hook tests", () => {
  it("renders with default values", () => {
    const { result } = renderHook(() => useChartData([]));

    expect(result.current.data).toEqual([]);
    expect(result.current.color).toBe("redColor");
    expect(result.current.gradient).toBe(ChartGradientColor.RedFull);
    expect(result.current.yDomain).toEqual([0, 0]);
  });

  it("renders with provided data and gradient variant", () => {
    const data = [
      { x: 1, y: 10 },
      { x: 2, y: 20 },
    ];
    const gradientVariant = "card";
    const { result } = renderHook(() => useChartData(data, gradientVariant));

    expect(result.current.data).toEqual([
      { x: 1, y: 10, y0: 0 },
      { x: 2, y: 20, y0: 0 },
    ]);
    expect(result.current.color).toBe("greenColor");
    expect(result.current.gradient).toBe(ChartGradientColor.GreenCard);
    expect(result.current.yDomain).toEqual([0, 20]);
  });
});
