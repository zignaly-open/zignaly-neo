import React from "react";
import { ChartGradientColor } from "./types";

const ChartGradients = () => (
  <svg style={{ width: 0, height: 0, display: "block" }}>
    <defs>
      <linearGradient id={ChartGradientColor.RedMini} x1="1%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor={"rgba(18, 20, 39, 0)"} />
        <stop offset="50%" stopColor={"rgba(21, 21, 57, 0.5)"} />
        <stop offset="100%" stopColor={"rgba(86, 36, 108, 1)"} />
      </linearGradient>

      <linearGradient id={ChartGradientColor.GreenMini} x1="1%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor={"rgba(17, 27, 47, 0)"} />
        <stop offset="50%" stopColor={"rgba(22, 41, 67, 0.5)"} />
        <stop offset="100%" stopColor={"rgba(39, 110, 107, 1)"} />
      </linearGradient>
      <linearGradient id={ChartGradientColor.RedCard} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="rgba(37, 15, 38, 0.38)" stopOpacity="0.76" />
        <stop offset="32%" stopColor="rgba(46, 0, 28, 0.44)" stopOpacity="0.76" />
        <stop offset="100%" stopColor="rgba(204, 57, 147, 0.69)" stopOpacity="0.76" />
      </linearGradient>
      <linearGradient id={ChartGradientColor.GreenCard} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="rgba(16, 33, 33, 0.68)" stopOpacity="0.76" />
        <stop offset="32%" stopColor="rgba(0, 45, 20, 0.44)" stopOpacity="0.76" />
        <stop offset="53%" stopColor="rgba(7, 47, 30, 0.44)" stopOpacity="0.76" />
        <stop offset="100%" stopColor="rgba(56, 235, 170, 0.69)" stopOpacity="0.76" />
      </linearGradient>
      <linearGradient id={ChartGradientColor.RedFull} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="rgba(31, 18, 59, 0.52)" />
        <stop offset="100%" stopColor="rgba(74, 33, 81, 0.69)" />
      </linearGradient>

      <linearGradient id={ChartGradientColor.GreenFull} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="rgba(18, 33, 59, 0.52)" />
        <stop offset="100%" stopColor="rgba(33, 81, 78, 0.69)" />
      </linearGradient>
    </defs>
  </svg>
);

export default ChartGradients;
