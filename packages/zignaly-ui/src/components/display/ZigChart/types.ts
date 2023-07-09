import { VictoryChartProps } from "victory";
import { dark } from "../../../theme";

export const ChartColor = {
  Green: dark.chart.green,
  Red: dark.chart.red,
};

export enum ChartGradientColor {
  GreenMini = "chart-gradient-mini-green",
  RedMini = "chart-gradient-mini-red",
  GreenFull = "chart-gradient-full-green",
  RedFull = "chart-gradient-full-red",
  GreenCard = "chart-gradient-card-green",
  RedCard = "chart-gradient-card-red",
}

export type ChartEvent = {
  x: number;
  label: string;
};

export type GradientVariant = "mini" | "full" | "card";

export interface ChartMiniProps {
  readonly data: AxisFormat[] | number[];
  precision?: number;
  midLine?: boolean | null;
  height?: number;
  width?: number;
  gradientVariant?: GradientVariant;
  chartProps?: VictoryChartProps;
  id?: string;
}

export interface ChartLargeProps {
  readonly data: AxisFormat[] | number[];
  tickCount?: number;
  bars?: boolean;
  events?: ChartEvent[];
  onlyIntegerTicks?: boolean;
  yAxisFormatter?: (y: number | string) => string;
  tooltipFormatter?: (v: AxisFormat) => string;
  chartProps?: VictoryChartProps;
  id?: string;
  precision?: number;
}

export interface AxisFormat {
  x: number | string;
  y: number;
}
