export interface ChartsProps {
  readonly variant: ChartVariations;
  readonly yAxis?: "left" | "right";
  readonly data: AxisFormat[];
  midLine?: boolean | null;
}

export interface AxisFormat {
  x: number | string;
  y: number;
}

export interface ChartInput {
  data: AxisFormat[];
  isGreen: boolean;
  midLine?: boolean | null;
}

export enum ChartVariations {
  SMALL = "small",
  LARGE = "large",
}

export const largeStyle = {
  axisLabel: {
    fontSize: 20,
    padding: 30,
    fill: "white",
    fontFamily: "Avenir Next",
    letterSpacing: 0.55,
    lineHeight: 16,
  },
  tickLabels: {
    fontSize: 11,
    padding: 5,
    fill: "white",
    fontFamily: "Avenir Next",
    letterSpacing: 0.55,
    lineHeight: 16,
  },
};
