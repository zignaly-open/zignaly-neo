import React, { useMemo } from "react";
import { ZigRiskProps } from "./types";
import { ReactComponent as Risk1Icon } from "assets/icons/risk/risk-1.svg";
import { ReactComponent as Risk2Icon } from "assets/icons/risk/risk-2.svg";
import { ReactComponent as Risk3Icon } from "assets/icons/risk/risk-3.svg";
import { ReactComponent as Risk4Icon } from "assets/icons/risk/risk-4.svg";
import { ReactComponent as Risk5Icon } from "assets/icons/risk/risk-5.svg";
import { Box } from "@mui/material";
import ZigTypography from "../ZigTypography";

const ZigRisk = ({ value, width = 55, height = 30 }: ZigRiskProps) => {
  const risks = useMemo(
    () => ({
      0: {
        icon: Risk1Icon,
        label: "Very low risk",
        color: "#24b88e",
      },
      1: {
        icon: Risk2Icon,
        label: "Low risk",
        color: "#9fcb6e",
      },
      2: {
        icon: Risk3Icon,
        label: "Average risk",
        color: "#c2b864",
      },
      3: {
        icon: Risk4Icon,
        label: "Risky",
        color: "#e7a675",
      },
      4: {
        icon: Risk5Icon,
        label: "Very risky",
        color: "#f14a84",
      },
    }),
    [],
  );

  const level = useMemo(() => {
    if (value >= 24) return 0;
    if (value >= 18) return 1;
    if (value >= 12) return 2;
    if (value >= 6) return 3;
    return 4;
  }, [value]);
  const risk = risks[level];
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
