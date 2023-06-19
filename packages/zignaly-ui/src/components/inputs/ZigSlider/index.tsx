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
  ({ labels = {}, prefixId, className = "", valueLabelFormat, ...props }: ZigSliderProps, ref) => {
    let valueLabelFormatDefaulted = valueLabelFormat;
    if (!valueLabelFormatDefaulted && (!props.max || props.max === 100)) {
      valueLabelFormatDefaulted = (value: number) => `${value}%`;
    }
    const { start, end, showValues = true } = labels;
    const showLabels = start || end;

    return (
      <Box
        display="flex"
        flexDirection="column"
        id={prefixId && `${prefixId}__container`}
        gap="10px"
        width={1}
        className={className}
        ref={ref}
      >
        {labels?.top && (
          <ZigTypography color={"neutral200"} id={prefixId && `${prefixId}__title`}>
            {labels?.top}
          </ZigTypography>
        )}
        <Box
          display="flex"
          width={1}
          gap={1}
          alignItems="center"
          pt={showLabels ? 3 : 0}
          position="relative"
        >
          <Box display="flex" width={1} gap={1} alignItems="center" px={showLabels ? "6px" : 0}>
            {showValues && (
              <SliderLabelValue
                prefixId={prefixId && `${prefixId}__label-start`}
                side="start"
                labels={labels}
                min={props.min}
                max={props.max}
                value={props.value as number}
                valueLabelFormat={valueLabelFormatDefaulted}
              />
            )}
            <Slider
              itemID={"adadsds"}
              id={prefixId && `${prefixId}__slider`}
              marks={marks}
              track={false}
              valueLabelDisplay={labels.invertSliderValues ? "off" : "auto"}
              valueLabelFormat={valueLabelFormatDefaulted}
              {...props}
            />
            {showValues && (
              <SliderLabelValue
                prefixId={prefixId && `${prefixId}__label-end`}
                side="end"
                labels={labels}
                min={props.min}
                max={props.max}
                value={props.value as number}
                valueLabelFormat={valueLabelFormatDefaulted}
              />
            )}
          </Box>
        </Box>
      </Box>
    );
  },
);

export default ZigSlider;
