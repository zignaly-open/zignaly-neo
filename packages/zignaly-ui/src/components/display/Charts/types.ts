import { dark } from "../../../theme";

export interface ChartsProps {
  readonly variant: keyof typeof ChartVariations;
  readonly yAxis?: "left" | "right";
  readonly data: AxisFormat[] | number[];
  midLine?: boolean | null;
}

export interface AxisFormat {
  x: number | string;
  y: number;
}

export const ChartVariations = {
  small: "small",
  large: "large",
};

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
