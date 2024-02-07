import { useTheme } from "@mui/material";
import React from "react";

export const GradientDefs = ({
  category,
  prefixId = "zscore-ring",
}: {
  category: string;
  prefixId?: string;
}) => {
  const {
    palette: { zscore },
  } = useTheme();
  const colors = zscore.ring[category];

  return (
    <defs>
      <linearGradient id={`${prefixId}-${category}-1`} gradientTransform="rotate(180 0.5 0.5)">
        <stop offset="0.0" stop-color={colors.gradient[0]} />
        <stop offset="0.75" stop-color={colors.gradient[1]} />
      </linearGradient>
      <linearGradient id={`${prefixId}-${category}-2`} gradientTransform="rotate(-36 0.5 0.5)">
        <stop offset="0" stop-color={colors.gradient[1]} />
        <stop offset="0.75" stop-color={colors.gradient[2]} />
      </linearGradient>
    </defs>
  );
};
