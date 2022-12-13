export enum ChartColor {
  Green = "#18ED90",
  Red = "#CC3993",
}

export enum ChartGradientColor {
  Green = "chart-gradient-green",
  Red = "chart-gradient-red",
}

export type ChartEvent = {
  x: number;
  label: string;
};

export interface ChartMiniProps {
  readonly data: AxisFormat[] | number[];
  midLine?: boolean | null;
  height?: number;
}

export interface ChartLargeProps {
  readonly data: AxisFormat[] | number[];
  tickCount?: number;
  events?: ChartEvent[];
  onlyIntegerTicks?: boolean;
  yAxisFormatter?: (y: number | string) => string;
}

export interface AxisFormat {
  x: number | string;
  y: number;
}
