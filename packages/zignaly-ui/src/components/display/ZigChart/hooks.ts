import { useMemo } from "react";
import { AxisFormat, ChartColor, ChartGradientColor } from "./types";

export function useChartData(data: AxisFormat[] | number[]): {
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
    return chart.map((c) => ({ ...c, y0: min }));
  }, [data]);

  const firstTimestamp = processedData[0].y;
  const lastTimeStamp = processedData[data.length - 1].y;
  const isGreen = firstTimestamp <= lastTimeStamp;

  return {
    data: processedData,
    color: isGreen ? ChartColor.Green : ChartColor.Red,
    gradient: isGreen ? ChartGradientColor.Green : ChartGradientColor.Red,
  };
}
