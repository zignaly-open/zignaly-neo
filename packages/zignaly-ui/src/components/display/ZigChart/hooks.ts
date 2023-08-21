import { useMemo } from "react";
import { AxisFormat, ChartGradientColor, GradientVariant } from "./types";
import { useChartColor } from "./ZigChart/util";

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
  if (ranges[0] < 0 && ranges[1] > 0) {
    ranges[0] = Math.min(
      ranges[0],
      (ranges[1] * -1 * deltaToShowSecondChart) / (1 - deltaToShowSecondChart),
    );
  } else if (ranges[1] <= 0) {
    // If all values are negative, we need to force the upper value to be slightly above 0 to
    // avoid the x axis being on top.
    // This doesn't work: https://stackoverflow.com/a/53396988/1494428

    // Calculate the data range, then set the upper limit to a small fraction of that range
    ranges[1] = Math.abs(ranges[1] - ranges[0]) * 0.01;
  }

  return ranges as [number, number];
};

export function useChartData(
  data: AxisFormat[] | number[],
  gradientVariant = "full" as GradientVariant,
  precision?: number,
): {
  data: AxisFormat[];
  color: string;
  gradient: ChartGradientColor;
  yDomain: [number, number];
} {
  const chartColors = useChartColor();
  const [processedData, yDomain] = useMemo(() => {
    const chart = data.map((value, index) => {
      const { x, y, ...rest } = typeof value === "object" ? value : { x: index, y: value };
      return {
        x,
        // Remove extra decimals to normalize range (e.g. avoiding 0 to 0.0001%)
        y: precision ? +y.toFixed(precision) : y,
        // Keep rest of properties that may be useful for tooltip
        ...rest,
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
    color: isGreen ? chartColors.green : chartColors.red,
    gradient: getGradient(gradientVariant, isGreen),
    yDomain,
  };
}
