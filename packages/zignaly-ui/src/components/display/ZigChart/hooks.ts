import { useMemo } from "react";
import { AxisFormat, ChartColor, ChartGradientColor, GradientVariant } from "./types";

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

export function useChartData(
  data: AxisFormat[] | number[],
  gradientVariant = "full" as GradientVariant,
): {
  data: AxisFormat[];
  color: ChartColor;
  gradient: ChartGradientColor;
} {
  const processedData = useMemo<AxisFormat[]>(() => {
    const chart =
      typeof data?.[0] === "number"
        ? data.map((value, index) => ({
            x: index,
            y: value as number,
          }))
        : (data as AxisFormat[]);
    const min = chart.reduce((min, v) => Math.min(min, v.y), Number.MAX_VALUE);
    return chart.map((c) => ({ ...c, y0: Math.min(0, min) }));
  }, [data]);

  const firstTimestamp = processedData[0].y;
  const lastTimeStamp = processedData[data.length - 1].y;
  const isGreen = firstTimestamp <= lastTimeStamp;

  return {
    data: processedData,
    color: isGreen ? ChartColor.Green : ChartColor.Red,
    gradient: getGradient(gradientVariant, isGreen),
  };
}
