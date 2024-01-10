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
  labelFormat,
  prefixId,
}: {
  labels: SliderLabels;
  side: "start" | "end";
  max?: number;
  min?: number;
  value?: number;
  labelFormat?: (value: number) => string | JSX.Element;
  prefixId?: string;
}) => {
  const valueLabel =
    side === "start"
      ? labels.invertSliderValues
        ? max - value
        : min
      : labels.invertSliderValues
      ? value
      : max;

  let valueLabelStr: string | JSX.Element = valueLabel.toString();
  if (labelFormat) {
    valueLabelStr = labelFormat(valueLabel);
  } else if (max === 100 && labelFormat !== null) {
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
          left: side === "start" ? 0 : "auto",
          right: side === "start" ? "auto" : 0,
          ...(labels.labelsAbove !== false ? { top: 0 } : { bottom: 0 }),
        }}
        id={prefixId && `${prefixId}-label`}
      >
        {side === "start" ? labels.start : labels.end}
      </ZigTypography>
      <ZigTypography color="neutral400" variant="body2" id={prefixId && `${prefixId}-value`}>
        {valueLabelStr}
      </ZigTypography>
    </Box>
  );
};
