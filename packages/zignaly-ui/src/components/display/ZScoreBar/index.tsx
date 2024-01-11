import React from "react";
import { Box } from "@mui/material";
import { ZScoreBarProps } from "./types";
import { BarThumb, StyledLinearProgress } from "./styles";
import ZigTypography from "../ZigTypography";

const ZScoreBar = ({ value, max = 100, ...props }: ZScoreBarProps) => {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1, position: "relative" }}>
        <BarThumb value={pct} />
        <StyledLinearProgress variant="determinate" value={pct} {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <ZigTypography variant="body2" color="text.secondary">{`${Math.round(
          value,
        )}%`}</ZigTypography>
      </Box>
    </Box>
  );
};
export default ZScoreBar;
