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
  const ranges = [Math.min(0, ...values), Math.max(1, ...values)];
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
): {
  data: AxisFormat[];
  color: ChartColor;
  gradient: ChartGradientColor;
  yDomain: [number, number];
} {
  const [processedData, yDomain] = useMemo(() => {
    const chart =
      typeof data?.[0] === "number"
        ? data.map((value, index) => ({
            x: index,
            y: value as number,
          }))
        : (data as AxisFormat[]);
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
