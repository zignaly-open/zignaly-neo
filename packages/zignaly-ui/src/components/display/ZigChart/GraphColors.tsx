import React from "react";
import { ChartGradientColor, GradientVariant } from "./types";

const GraphColors = ({ variant = "full" }: { variant?: GradientVariant }) => (
  <svg style={{ width: 0, height: 0, display: "block" }}>
    <defs>
      {variant === "short" ? (
        <>
          <linearGradient id={ChartGradientColor.Red} x1="1%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={"rgba(18, 20, 39, 0)"} />
            <stop offset="50%" stopColor={"rgba(21, 21, 57, 0.5)"} />
            <stop offset="100%" stopColor={"rgba(86, 36, 108, 1)"} />
          </linearGradient>

          <linearGradient id={ChartGradientColor.Green} x1="1%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={"rgba(17, 27, 47, 0)"} />
            <stop offset="50%" stopColor={"rgba(22, 41, 67, 0.5)"} />
            <stop offset="100%" stopColor={"rgba(39, 110, 107, 1)"} />
          </linearGradient>
        </>
      ) : (
        <>
          <linearGradient id={ChartGradientColor.RedCard} x1="0" y1="1" x2="0" y2="0">
            {/* <stop offset="0%" stop-color="rgba(46, 0, 28, 0.32)" stop-opacity="0.76" /> */}
            <stop offset="0%" stop-color="rgba(37, 15, 38, 0.38)" stop-opacity="0.76" />
            <stop offset="32%" stop-color="rgba(46, 0, 28, 0.44)" stop-opacity="0.76" />
            <stop offset="100%" stop-color="rgba(204, 57, 147, 0.69)" stop-opacity="0.76" />
          </linearGradient>
          <linearGradient id={ChartGradientColor.GreenCard} x1="0" y1="1" x2="0" y2="0">
            {/* <stop offset="0%" stop-color="rgba(0, 45, 20, 0.74)" stop-opacity="0.76" /> */}
            <stop offset="0%" stop-color="rgba(16, 33, 33, 0.68)" stop-opacity="0.76" />
            <stop offset="32%" stop-color="rgba(0, 45, 20, 0.44)" stop-opacity="0.76" />
            <stop offset="53%" stop-color="rgba(7, 47, 30, 0.44)" stop-opacity="0.76" />
            <stop offset="100%" stop-color="rgba(56, 235, 170, 0.69)" stop-opacity="0.76" />
          </linearGradient>
          <linearGradient id={ChartGradientColor.RedLong} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="rgba(31, 18, 59, 0.52)" />
            <stop offset="100%" stop-color="rgba(74, 33, 81, 0.69)" />
          </linearGradient>

          <linearGradient id={ChartGradientColor.GreenLong} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="rgba(18, 33, 59, 0.52)" />
            <stop offset="100%" stop-color="rgba(33, 81, 78, 0.69)" />
          </linearGradient>
        </>
      )}
    </defs>
  </svg>
);

export default GraphColors;
