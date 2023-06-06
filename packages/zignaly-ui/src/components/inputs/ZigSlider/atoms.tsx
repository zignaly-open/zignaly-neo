import { Box, SliderProps } from "@mui/material";
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
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={side === "start" ? "flex-start" : "flex-end"}
      minWidth="44px"
    >
      <ZigTypography
        color="neutral100"
        variant="body2"
        sx={{
          position: "absolute",
          top: 0,
          left: side === "start" ? 0 : "auto",
          right: side === "start" ? "auto" : 0,
        }}
      >
        {side === "start" ? labels.start : labels.end}
      </ZigTypography>
      <ZigTypography color="neutral400" variant="body2">
        {side === "start"
          ? labels.percent !== false
            ? `${max - value}%`
            : value
          : labels.percent !== false
          ? `${value}%`
          : max}
      </ZigTypography>
    </Box>
  );
};
