import React, { forwardRef } from "react";
import { Box, Slider } from "@mui/material";
import { ZigSliderProps } from "./types";
import { SliderLabelValue } from "./atoms";
import ZigTypography from "components/display/ZigTypography";

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

const ZigSlider = forwardRef(
  ({ labels, prefixId, className = "", ...props }: ZigSliderProps, ref) => {
    const showLabels = labels?.start || labels?.end;

    return (
      <Box
        display="flex"
        flexDirection="column"
        id={prefixId && `${prefixId}-slider`}
        gap="10px"
        width={1}
        className={className}
        ref={ref}
      >
        {labels?.top && (
          <ZigTypography color={"neutral200"} id={prefixId && `${prefixId}-title`}>
            {labels?.top}
          </ZigTypography>
        )}
        <Box display="flex" width={1} gap={1} alignItems="center" pt={3} position="relative">
          <Box display="flex" width={1} gap={1} alignItems="center" px={showLabels ? "6px" : 0}>
            {showLabels && (
              <SliderLabelValue
                side="start"
                labels={labels}
                max={props.max}
                value={props.value as number}
              />
            )}
            <Slider
              marks={marks}
              sx={{
                "& .MuiSlider-track": {
                  color: "transparent",
                },
              }}
              {...props}
            />
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
      </Box>
    );
  },
);

export default ZigSlider;
