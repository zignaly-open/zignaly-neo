// Dependencies
import * as React from "react";
import { ReactElement } from "react";
import * as LoaderSource from "react-loader-spinner";

export enum LoaderTypes {
  AUDIO = "audio",
  BARS = "bars",
  CIRCLES = "circles",
  FALLING_LINES = "falling_lines",
  GRID = "grid",
  OVAL = "oval",
  TAILSPIN = "tailspin",
  THREE_DOTS = "three_dots",
}

const componentsByType = {
  [LoaderTypes.AUDIO]: LoaderSource.Audio,
  [LoaderTypes.BARS]: LoaderSource.Bars,
  [LoaderTypes.CIRCLES]: LoaderSource.Circles,
  [LoaderTypes.FALLING_LINES]: LoaderSource.FallingLines,
  [LoaderTypes.GRID]: LoaderSource.Grid,
  [LoaderTypes.OVAL]: LoaderSource.Oval,
  [LoaderTypes.TAILSPIN]: LoaderSource.TailSpin,
  [LoaderTypes.THREE_DOTS]: LoaderSource.ThreeDots,
};

type LoaderProps = {
  type?: LoaderTypes;
  width: string;
  height: string;
  color: string;
  secondaryColor?: string;
  ariaLabel: string;
  strokeWidth?: string;
};

function Loader({
  type = LoaderTypes.TAILSPIN,
  width,
  height,
  color,
  secondaryColor,
  ariaLabel,
  strokeWidth,
}: LoaderProps): ReactElement {
  const ComponentByType = componentsByType[type];

  return (
    <ComponentByType
      width={width}
      height={height}
      color={color}
      ariaLabel={ariaLabel}
      secondaryColor={secondaryColor}
      strokeWidth={strokeWidth}
    />
  );
}

export default Loader;
