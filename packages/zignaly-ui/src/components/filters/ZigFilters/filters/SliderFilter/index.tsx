import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SliderFilterProps } from "./type";
import { StyledZigSlider, Value } from "./styles";
import ZigTypography from "components/display/ZigTypography";
import { SliderFilter as SliderFilterType } from "../../types";

const SliderFilter = ({ filter, onChange }: SliderFilterProps) => {
  const {
    label,
    value,
    min = 0,
    max = 100,
    step = 1,
    allowNoMin = false,
    allowNoMax = false,
    id,
  } = filter;
  // Value used for displaying the slider values before it's committed
  const [internalValue, setInternalValue] = useState(value);
  // Value used for the slider itself, handling no min/max values
  const sliderValue = Array.isArray(internalValue)
    ? [
        internalValue[0] === null ? min - step : internalValue[0],
        internalValue[1] === null ? max + step : internalValue[1],
      ]
    : internalValue;

  useEffect(() => {
    if (value !== internalValue) {
      setInternalValue(value);
    }
  }, [value]);

  const adaptMin = (value: number) => {
    if (value < min) return null;
    if (value > max) return max;
    return value;
  };

  const adaptMax = (value: number) => {
    if (value > max) return null;
    if (value < min) return min;
    return value;
  };

  /**
   * Set values as null when outside the range
   */
  const adaptValue = (value: number | number[]): SliderFilterType["value"] =>
    Array.isArray(value) ? [adaptMin(value[0]), adaptMax(value[1])] : value;

  return (
    <Box>
      {label && (
        <ZigTypography component={"div"} pb={1} id={`filter-slider-${id}__label`}>
          {label}
        </ZigTypography>
      )}
      <StyledZigSlider
        value={sliderValue}
        min={allowNoMin ? min - step : min}
        max={allowNoMax ? max + step : max}
        onChange={(_, v) => setInternalValue(adaptValue(v))}
        onChangeCommitted={(_, v) => onChange({ ...filter, value: adaptValue(v) })}
        marks={false}
        valueLabelDisplay="off"
        labels={{ showValues: false }}
      />
      <Box display={"flex"} justifyContent={"center"} pt={1} gap={"6px"}>
        {Array.isArray(internalValue) ? (
          <>
            <Value showPct={internalValue[0] !== null} id={`filter-slider-${id}__value-1`}>
              {internalValue[0] === null ? "Min" : internalValue[0]}
            </Value>
            <ZigTypography fontSize={15}>to</ZigTypography>
            <Value showPct={internalValue[1] !== null} id={`filter-slider-${id}__value-2`}>
              {internalValue[1] === null ? "Max" : internalValue[1]}
            </Value>
          </>
        ) : (
          <Value showPct={true}>{internalValue}</Value>
        )}
      </Box>
    </Box>
  );
};

export default SliderFilter;
