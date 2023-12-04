import { Box, Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { CheckBoxFilterProps } from "./type";
import ZigTypography from "components/display/ZigTypography";

const CheckBoxFilter = ({ filter, onChange }: CheckBoxFilterProps) => {
  const { label, options, value } = filter;

  const handleChange = (o: string, checked: boolean) => {
    let updatedValue = [...value];

    if (checked) {
      if (!updatedValue.includes(o)) {
        updatedValue.push(o);
      }
    } else {
      updatedValue = updatedValue.filter((option) => option !== o);
    }

    onChange({ ...filter, value: updatedValue });
  };

  return (
    <Box display={"flex"} flexDirection={"column"}>
      {label && (
        <ZigTypography component={"div"} pb={1}>
          {label}
        </ZigTypography>
      )}
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          label={option.label}
          control={
            <Checkbox
              checked={value?.includes(option.value)}
              onChange={(_, checked) => handleChange(option.value, checked)}
            />
          }
        />
      ))}
    </Box>
  );
};

export default CheckBoxFilter;
