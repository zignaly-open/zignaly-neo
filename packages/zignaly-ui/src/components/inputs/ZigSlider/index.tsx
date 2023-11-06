import React, { forwardRef } from "react";
import { Box, Slider } from "@mui/material";
import { ZigSliderProps } from "./types";
import { SliderLabelValue } from "./atoms";
import ZigTypography from "components/display/ZigTypography";

const ZigSlider = forwardRef(
  (
    {
      labels = {},
      prefixId,
      className = "",
      valueLabelFormat,
      labelFormat = true,
      ...props
    }: ZigSliderProps,
    ref,
  ) => {
    let valueLabelFormatDefaulted = valueLabelFormat;
    if (!valueLabelFormatDefaulted && (!props.max || props.max === 100)) {
      valueLabelFormatDefaulted = (value: number) => `${value}%`;
    }
    let labelFormatDefaulted = valueLabelFormatDefaulted;
    if (labelFormat && labelFormat !== true) {
      labelFormatDefaulted = labelFormat;
    }
    const { start, end, showValues = true, labelsAbove } = labels;
    const showLabels = start || end;

    const marks = [25, 50, 75].map((percentage) => ({
      value: (percentage * (props.max || 100)) / 100,
    }));

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
          pt={showLabels && labelsAbove !== false ? 3 : 0}
          pb={showLabels && labelsAbove === false ? 3 : 0}
          position="relative"
        >
          <Box display="flex" width={1} gap={"13px"} alignItems="center">
            {showValues && (
              <SliderLabelValue
                prefixId={prefixId && `${prefixId}__label-start`}
                side="start"
                labels={labels}
                min={props.min}
                max={props.max}
                value={props.value as number}
                labelFormat={labelFormatDefaulted}
              />
            )}
            <Slider
              id={prefixId && `${prefixId}__slider`}
              marks={marks}
              track={false}
              valueLabelDisplay={labels.invertSliderValues ? "off" : "auto"}
              valueLabelFormat={valueLabelFormatDefaulted}
              sx={{ width: "auto", flex: 1 }}
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
                labelFormat={labelFormatDefaulted}
              />
            )}
          </Box>
        </Box>
      </Box>
    );
  },
);

export default ZigSlider;
