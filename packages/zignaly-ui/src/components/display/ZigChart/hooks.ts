import { useMemo } from "react";
import { AxisFormat, ChartColor, ChartGradientColor, GradientVariant } from "./types";

const deltaToShowSecondChart = 0.2;

const getGradient = (gradientVariant: GradientVariant, isGreen: boolean) => {
  switch (gradientVariant) {
    case "mini":
      return isGreen ? ChartGradientColor.GreenMini : ChartGradientColor.RedMini;
    case "card":
      return isGreen ? ChartGradientColor.GreenCard : ChartGradientColor.RedCard;
    default:
      return isGreen ? ChartGradientColor.GreenFull : ChartGradientColor.RedFull;
  }
};

/**
 * Get y domain for chart, adjusted to leave space under 0 axis if needed
 */
const getYDomain = (data: AxisFormat[]) => {
  const values = data.map((s) => s.y);
  // Add 0 to min values to show chart under 0 axis
  const ranges = [Math.min(0, ...values), Math.max(...values)];
  if (ranges[0] < 0 && ranges[1] > 0)
    ranges[0] = Math.min(
      ranges[0],
      (ranges[1] * -1 * deltaToShowSecondChart) / (1 - deltaToShowSecondChart),
    );

  return ranges as [number, number];
};

export function useChartData(
  data: AxisFormat[] | number[],
  gradientVariant = "full" as GradientVariant,
  precision?: number,
): {
  data: AxisFormat[];
  color: ChartColor;
  gradient: ChartGradientColor;
  yDomain: [number, number];
} {
  const [processedData, yDomain] = useMemo(() => {
    const chart = data.map((value, index) => {
      const y = typeof value === "number" ? value : value.y;
      return {
        ...(typeof value === "object" && { ...value }),
        x: index,
        // Remove extra decimals to normalize range (e.g. avoiding 0 to 0.0001%)
        y: +y.toFixed(precision),
      };
    });
    const yDomain = getYDomain(chart);
    return [chart.map((c) => ({ ...c, y0: yDomain[0] })), yDomain];
  }, [data]);

  const firstTimestamp = processedData[0].y;
  const lastTimeStamp = processedData[data.length - 1].y;
  const isGreen = firstTimestamp <= lastTimeStamp;

  return {
    data: processedData,
    color: isGreen ? ChartColor.Green : ChartColor.Red,
    gradient: getGradient(gradientVariant, isGreen),
    yDomain,
  };
}
