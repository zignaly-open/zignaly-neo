export enum ChartColor {
  Green = "#18ED90",
  Red = "#CC3993",
}

export enum ChartGradientColor {
  Green = "chart-gradient-green",
  Red = "chart-gradient-red",
  GreenLong = "chart-gradient-green-long",
  RedLong = "chart-gradient-red-long",
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
