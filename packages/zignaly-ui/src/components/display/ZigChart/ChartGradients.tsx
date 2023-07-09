import React from "react";
import { ChartGradientColor } from "./types";
import { dark } from "../../../theme";

const ChartGradients = () => (
  <svg style={{ width: 0, height: 0, display: "block" }}>
    <defs>
      <linearGradient id={ChartGradientColor.RedMini} x1="1%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor={dark.chart.redMiniGradient[0]} />
        <stop offset="50%" stopColor={dark.chart.redMiniGradient[1]} />
        <stop offset="100%" stopColor={dark.chart.redMiniGradient[2]} />
      </linearGradient>

      <linearGradient id={ChartGradientColor.GreenMini} x1="1%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor={dark.chart.greenMiniGradient[0]} />
        <stop offset="50%" stopColor={dark.chart.greenMiniGradient[1]} />
        <stop offset="100%" stopColor={dark.chart.greenMiniGradient[2]} />
      </linearGradient>
      <linearGradient id={ChartGradientColor.RedCard} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor={dark.chart.redCard[0]} stopOpacity="0.76" />
        <stop offset="32%" stopColor={dark.chart.redCard[1]} stopOpacity="0.76" />
        <stop offset="100%" stopColor={dark.chart.redCard[2]} stopOpacity="0.76" />
      </linearGradient>
      <linearGradient id={ChartGradientColor.GreenCard} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor={dark.chart.greenCard[0]} stopOpacity="0.76" />
        <stop offset="32%" stopColor={dark.chart.greenCard[1]} stopOpacity="0.76" />
        <stop offset="53%" stopColor={dark.chart.greenCard[2]} stopOpacity="0.76" />
        <stop offset="100%" stopColor={dark.chart.greenCard[3]} stopOpacity="0.76" />
      </linearGradient>
      <linearGradient id={ChartGradientColor.RedFull} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor={dark.chart.redGradient[0]} />
        <stop offset="100%" stopColor={dark.chart.redGradient[1]} />
      </linearGradient>

      <linearGradient id={ChartGradientColor.GreenFull} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor={dark.chart.greenGradient[0]} />
        <stop offset="100%" stopColor={dark.chart.greenGradient[0]} />
      </linearGradient>
    </defs>
  </svg>
);

export default ChartGradients;
