import React from "react";
import { ZigRiskProps } from "./types";
import { Box } from "@mui/material";
import ZigTypography from "../ZigTypography";
import { useRisk } from "./use";

const ZigRisk = ({ value, width = 55, height = 30 }: ZigRiskProps) => {
  const risk = useRisk(value);
  const Icon = risk.icon;

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap="3px">
      <Icon width={width} height={height} />
      <ZigTypography variant="h5" color={risk.color}>
        {risk.label}
      </ZigTypography>
    </Box>
  );
};

export default ZigRisk;
export * from "./types";
export * from "./use";
export * from "./util";
