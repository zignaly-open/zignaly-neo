import { Box, Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { CheckBoxFilterProps } from "./type";

const CheckBoxFilter = ({ filter, onChange }: CheckBoxFilterProps) => {
  const { label, options } = filter;

  const handleChange = (o: string, checked: boolean) => {
    const updatedOptions = options.map((option) => {
      if (option.value === o) {
        return { ...option, checked };
      }
      return option;
    });

    onChange({ ...filter, options: updatedOptions });
  };

  return (
    <Box display={"flex"} flexDirection={"column"}>
      {label}
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          label={option.label}
          control={
            <Checkbox
              checked={option.checked}
              onChange={(_, checked) => handleChange(option.value, checked)}
            />
          }
        />
      ))}
    </Box>
  );
};

export default CheckBoxFilter;
