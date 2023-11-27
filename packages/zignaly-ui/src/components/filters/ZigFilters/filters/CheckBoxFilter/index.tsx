import { Box, Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

const CheckBoxFilter = ({ filter, onChange }: CheckBoxFilterProps) => {
  const { label, options } = filter;
  const handleChange = (o, checked) => {
    const updatedOptions = options.map((option) => {
      if (option.value === o) {
        return { ...option, checked };
      }
      return option;
    });

    onChange(updatedOptions);
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
              onChange={(e, checked) => handleChange(option.value, checked)}
            />
          }
        />
      ))}
    </Box>
  );
};

export default CheckBoxFilter;
