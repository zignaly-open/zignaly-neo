export enum ChartColor {
  Green = "#18ED90",
  Red = "#CC3993",
}

export enum ChartGradientColor {
  Green = "chart-gradient-green",
  Red = "chart-gradient-red",
}

export interface ChartMiniProps {
  readonly data: AxisFormat[] | number[];
  midLine?: boolean | null;
  height?: number;
}

export interface ChartLargeProps {
  readonly data: AxisFormat[] | number[];
  tickCount?: number;
  onlyIntegerTicks?: boolean;
  yAxisFormatter?: (y: number | string) => string;
}

export interface AxisFormat {
  x: number | string;
  y: number;
}
