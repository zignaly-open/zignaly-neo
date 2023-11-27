import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SliderFilterProps } from "./type";
import { StyledZigSlider, Value } from "./styles";
import ZigTypography from "components/display/ZigTypography";

const SliderFilter = ({ filter, onChange }: SliderFilterProps) => {
  const {
    label,
    value,
    min = 0,
    max = 100,
    step = 1,
    allowNoMin = false,
    allowNoMax = false,
  } = filter;
  const [internalValue, setInternalValue] = useState(value);
  console.log("slider", filter, internalValue);
  useEffect(() => {
    if (value !== internalValue) {
      setInternalValue(value);
    }
  }, [value]);

  return (
    <Box>
      {label}
      <StyledZigSlider
        value={internalValue}
        min={allowNoMin ? min - step : min}
        max={allowNoMax ? max + step : max}
        onChange={(e, v) => setInternalValue(v)}
        onChangeCommitted={(e, v) => onChange(v)}
        marks={false}
        valueLabelDisplay="off"
        labels={{ showValues: false }}
      />
      <Box display={"flex"} justifyContent={"center"} pt={1} gap={"6px"}>
        <Value showPct={internalValue[0] >= min}>
          {internalValue[0] < min ? "Min" : internalValue[0]}
        </Value>
        <ZigTypography fontSize={18}>to</ZigTypography>
        <Value showPct={internalValue[1] <= max}>
          {internalValue[1] > max ? "Max" : internalValue[1]}
        </Value>
      </Box>
    </Box>
  );
};

export default SliderFilter;
