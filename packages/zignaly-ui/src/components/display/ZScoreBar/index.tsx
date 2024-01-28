import React from "react";
import { Box } from "@mui/material";
import { ZScoreBarProps } from "./types";
import { BarThumb, StyledLinearProgress } from "./styles";
import ZigTypography from "../ZigTypography";
import { round } from "lodash-es";

const ZScoreBar = ({ value, max = 100, id, ...props }: ZScoreBarProps) => {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }} id={id}>
      <Box sx={{ flex: 1, mr: "13px", position: "relative" }}>
        <BarThumb value={pct} />
        <StyledLinearProgress variant="determinate" value={pct} {...props} />
      </Box>
      <Box sx={{ minWidth: 53 }} display={"flex"} justifyContent={"flex-start"}>
        <ZigTypography variant="body2" color="neutral000" fontSize={15} fontWeight={600}>{`${round(
          value,
          1,
        )}`}</ZigTypography>
        <ZigTypography color="paleBlue" fontSize={11} fontWeight={500}>
          /{`${Math.round(max)}`}
        </ZigTypography>
      </Box>
    </Box>
  );
};
export default ZScoreBar;
