import React from "react";
import { Box, Slider } from "@mui/material";
import { ZigSliderProps } from "./types";
import ZigTypography from "components/display/ZigTypography";
import { SliderLabelValue } from "./atoms";

const marks = [
  {
    value: 0,
  },
  {
    value: 25,
  },
  {
    value: 50,
  },
  {
    value: 75,
  },
  {
    value: 100,
  },
];

const ZigSlider = ({ labels, ...props }: ZigSliderProps) => {
  return (
    <Box display="flex" width={1} gap={1}>
      {labels && <SliderLabelValue side="start" labels={labels} max={props.max} />}
      <Slider marks={marks} {...props} />
      {labels && <SliderLabelValue side="end" labels={labels} max={props.max} />}
    </Box>
  );
};

export default ZigSlider;
