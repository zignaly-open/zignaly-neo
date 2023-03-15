import { VictoryChartProps } from "victory";

export enum ChartColor {
  Green = "#039179",
  Red = "#CC3993",
}

export enum ChartGradientColor {
  Green = "chart-gradient-green",
  Red = "chart-gradient-red",
  GreenLong = "chart-gradient-green-long",
  GreenCard = "chart-gradient-green-card",
  RedLong = "chart-gradient-red-long",
  RedCard = "chart-gradient-red-card",
}

export type ChartEvent = {
  x: number;
  label: string;
};

export type GradientVariant = "short" | "full";

export interface ChartMiniProps {
  readonly data: AxisFormat[] | number[];
  midLine?: boolean | null;
  height?: number;
  width?: number;
  gradientVariant?: GradientVariant;
  chartProps?: VictoryChartProps;
}

export interface ChartLargeProps {
  readonly data: AxisFormat[] | number[];
  tickCount?: number;
  bars?: boolean;
  events?: ChartEvent[];
  onlyIntegerTicks?: boolean;
  yAxisFormatter?: (y: number | string) => string;
}

export interface AxisFormat {
  x: number | string;
  y: number;
}
