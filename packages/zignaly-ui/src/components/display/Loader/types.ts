import { FunctionComponent } from "react";
import * as LoaderSource from "react-loader-spinner";

export enum LoaderTypes {
  AUDIO = "audio",
  BARS = "bars",
  CIRCLES = "circles",
  FALLING_LINES = "falling_lines",
  GRID = "grid",
  OVAL = "oval",
  TAILSPIN = "tail-spin",
  THREE_DOTS = "three-dots",
}

export const componentsByType = {
  [LoaderTypes.AUDIO]: LoaderSource.Audio,
  [LoaderTypes.BARS]: LoaderSource.Bars,
  [LoaderTypes.CIRCLES]: LoaderSource.Circles,
  [LoaderTypes.FALLING_LINES]: LoaderSource.FallingLines,
  [LoaderTypes.GRID]: LoaderSource.Grid as FunctionComponent,
  [LoaderTypes.OVAL]: LoaderSource.Oval as FunctionComponent,
  [LoaderTypes.TAILSPIN]: LoaderSource.TailSpin as FunctionComponent,
  [LoaderTypes.THREE_DOTS]: LoaderSource.ThreeDots as FunctionComponent,
};

export type LoaderProps = {
  type?: LoaderTypes;
  width?: string;
  height?: string;
  color: string;
  secondaryColor?: string;
  ariaLabel: string;
  strokeWidth?: string;
  className?: string;
};
