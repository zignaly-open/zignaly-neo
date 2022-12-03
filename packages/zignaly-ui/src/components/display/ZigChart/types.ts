import { dark } from "../../../theme";

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
}

export interface AxisFormat {
  x: number | string;
  y: number;
}

export const largeStyle = {
  axisLabel: {
    fontSize: 20,
    padding: 30,
    // sorry not sorry
    // this component is going to the dumpster anyways
    fill: dark.neutral200,
    fontFamily: "Avenir Next",
    letterSpacing: 0.55,
    lineHeight: 16,
  },
  tickLabels: {
    fontSize: 11,
    padding: 5,
    fill: dark.neutral200,
    fontFamily: "Avenir Next",
    letterSpacing: 0.55,
    lineHeight: 16,
  },
};
