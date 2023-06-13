import { Box } from "@mui/material";
import React from "react";
import { SliderLabels } from "./types";
import ZigTypography from "components/display/ZigTypography";

export const SliderLabelValue = ({
  labels,
  side,
  max = 100,
  min = 0,
  value = 0,
  valueLabelFormat,
}: {
  labels: SliderLabels;
  side: "start" | "end";
  max?: number;
  min?: number;
  value?: number;
  valueLabelFormat?: (value: number) => string;
}) => {
  const valueLabel =
    side === "start"
      ? labels.invertSliderValues
        ? max - value
        : min
      : labels.invertSliderValues
      ? value
      : max;

  let valueLabelStr = valueLabel.toString();
  if (valueLabelFormat) {
    valueLabelStr = valueLabelFormat(valueLabel);
  } else if (max === 100 && valueLabelFormat !== null) {
    valueLabelStr = `${valueLabel}%`;
  }

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
        {valueLabelStr}
      </ZigTypography>
    </Box>
  );
};
