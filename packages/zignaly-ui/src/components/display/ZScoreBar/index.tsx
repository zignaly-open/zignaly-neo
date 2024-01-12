import React from "react";
import { Box } from "@mui/material";
import { ZScoreBarProps } from "./types";
import { BarThumb, StyledLinearProgress } from "./styles";
import ZigTypography from "../ZigTypography";

const ZScoreBar = ({ value, max = 100, ...props }: ZScoreBarProps) => {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ flex: 1, mr: "13px", position: "relative" }}>
        <BarThumb value={pct} />
        <StyledLinearProgress variant="determinate" value={pct} {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <ZigTypography variant="body2" color="neutral300">{`${Math.round(value)}%`}</ZigTypography>
        <ZigTypography color="neutral400" fontSize={15} fontWeight={600}>
          /{`${Math.round(max)}%`}
        </ZigTypography>
      </Box>
    </Box>
  );
};
export default ZScoreBar;
export * from "./util";
