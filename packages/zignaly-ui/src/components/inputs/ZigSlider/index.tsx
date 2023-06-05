import React from "react";
import { Box, Slider } from "@mui/material";
import { ZigSliderProps } from "./types";
import { SliderLabelValue } from "./atoms";

const marks = [
  {
    value: 25,
  },
  {
    value: 50,
  },
  {
    value: 75,
  },
];

const ZigSlider = ({ labels, ...props }: ZigSliderProps) => {
  const showLabels = labels && typeof props.value === "number";

  return (
    <Box display="flex" width={1} gap={1} alignItems="center" pt={3} position="relative">
      <Box display="flex" width={1} gap={1} alignItems="center">
        {showLabels && (
          <SliderLabelValue
            side="start"
            labels={labels}
            max={props.max}
            value={props.value as number}
          />
        )}
        <Slider marks={marks} {...props} />
        {showLabels && (
          <SliderLabelValue
            side="end"
            labels={labels}
            max={props.max}
            value={props.value as number}
          />
        )}
      </Box>
    </Box>
  );
};

export default ZigSlider;
