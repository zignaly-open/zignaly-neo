import { ChartColors } from "../types";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import * as d3Scale from "victory-vendor/d3-scale";
import { AxisFormat } from "../types";

const THRESHOLD = 14;

export function useChartColor(): ChartColors {
  const theme = useTheme();
  return {
    green: theme.palette.chart.green,
    red: theme.palette.chart.red,
  };
}

export const useTicks = (
  data: AxisFormat[],
  yDomain: [number, number],
  tickCount: number,
  onlyIntegerTicks = false,
  showCurrentTick = false,
  height = 0,
) => {
  return useMemo(() => {
    const lastDataY = data[data.length - 1]?.y;

    const ticks = d3Scale
      .scaleLinear()
      .domain(yDomain)
      .ticks(tickCount)
      .filter((v) => !onlyIntegerTicks || Number.isInteger(v));

    if (!showCurrentTick) {
      return ticks;
    }

    const scale = d3Scale.scaleLinear().domain(yDomain).range([0, height]);

    const lastDataPointPositionScaled = scale(lastDataY);

    const overlapsExistingTick = ticks.find((existingTickPosition) => {
      const existingTickPositionScaled = scale(existingTickPosition);
      return Math.abs(existingTickPositionScaled - lastDataPointPositionScaled) < THRESHOLD;
    });

    const adjustedTicks = overlapsExistingTick
      ? ticks.filter((tick) => tick !== overlapsExistingTick)
      : ticks;

    return [...adjustedTicks, lastDataY];
  }, [data, yDomain, tickCount, onlyIntegerTicks, height]);
};
