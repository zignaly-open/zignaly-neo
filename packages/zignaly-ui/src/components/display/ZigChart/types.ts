import { VictoryChartProps } from "victory";

export enum ChartColor {
  Green = "#039179",
  Red = "#CC3993",
}

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
  tooltipFormatter?: (v: AxisFormat) => string;
  chartProps?: VictoryChartProps;
  id?: string;
}

export interface AxisFormat {
  x: number | string;
  y: number;
}
