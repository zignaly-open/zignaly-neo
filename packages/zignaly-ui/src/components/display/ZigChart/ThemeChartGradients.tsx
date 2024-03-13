import React from "react";
import { ChartGradientColor } from "./types";
import { useTheme } from "@mui/material";

const ThemeChartGradients = () => {
  const {
    palette: { chart },
  } = useTheme();
  return (
    <svg style={{ width: 0, height: 0, display: "block" }}>
      <defs>
        <linearGradient id={ChartGradientColor.RedMini} x1="1%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={chart.redMiniGradient[0]} />
          <stop offset="50%" stopColor={chart.redMiniGradient[1]} />
          <stop offset="100%" stopColor={chart.redMiniGradient[2]} />
        </linearGradient>

        <linearGradient id={ChartGradientColor.GreenMini} x1="1%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={chart.greenMiniGradient[0]} />
          <stop offset="50%" stopColor={chart.greenMiniGradient[1]} />
          <stop offset="100%" stopColor={chart.greenMiniGradient[2]} />
        </linearGradient>
        <linearGradient id={ChartGradientColor.RedFull} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={chart.redGradient[0]} />
          <stop offset="100%" stopColor={chart.redGradient[1]} />
        </linearGradient>

        <linearGradient id={ChartGradientColor.GreenFull} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={chart.greenGradient[0]} />
          <stop offset="100%" stopColor={chart.greenGradient[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ThemeChartGradients;
