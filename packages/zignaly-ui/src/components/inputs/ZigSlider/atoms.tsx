import { Box } from "@mui/material";
import { ZigTypography } from "index";
import React from "react";
import { SliderLabels } from "./types";

export const SliderLabelValue = ({
  labels,
  side,
  max = 100,
  value = 0,
}: {
  labels: SliderLabels;
  side: "start" | "end";
  max?: number;
  value?: number;
}) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <ZigTypography color="neutral100" variant="body2">
      {side === "start" ? labels.start : labels.end}
    </ZigTypography>
    <ZigTypography color="neutral400" variant="body2">
      {side === "start"
        ? labels.displayDifference !== false
          ? max - value
          : value
        : labels.displayDifference !== false
        ? value
        : max}
    </ZigTypography>
  </Box>
);
