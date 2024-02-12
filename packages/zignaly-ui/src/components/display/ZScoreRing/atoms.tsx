import React from "react";
import { useTheme } from "@mui/material";
import { ZScoreRiskCategory } from "./types";

export const GradientDefs = ({
  category,
  prefixId = "zscore-ring",
}: {
  category: `${ZScoreRiskCategory}`;
  prefixId?: string;
}) => {
  const {
    palette: { zscore },
  } = useTheme();
  const colors = zscore.ring[category];

  return (
    <defs>
      <linearGradient id={`${prefixId}-${category}-1`} gradientTransform="rotate(180 0.5 0.5)">
        <stop offset="0.0" stopColor={colors.gradient[0]} />
        <stop offset="0.75" stopColor={colors.gradient[1]} />
      </linearGradient>
      <linearGradient id={`${prefixId}-${category}-2`} gradientTransform="rotate(-36 0.5 0.5)">
        <stop offset="0" stopColor={colors.gradient[1]} />
        <stop offset="0.75" stopColor={colors.gradient[2]} />
      </linearGradient>
    </defs>
  );
};
