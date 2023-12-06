import { Box, FormControlLabel } from "@mui/material";
import React from "react";
import { CheckBoxFilterProps } from "./type";
import ZigTypography from "components/display/ZigTypography";
import CheckBox from "components/inputs/CheckBox";

const CheckBoxFilter = ({ filter, onChange }: CheckBoxFilterProps) => {
  const { label, options, value, id } = filter;

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
        <ZigTypography component={"div"} pb={1} id={`filter-checkbox_${id}__label`}>
          {label}
        </ZigTypography>
      )}
      {options.map((option) => (
        <Box py="6px" key={option.value}>
          <CheckBox
            id={`filter-checkbox_${id}__option`}
            value={value?.includes(option.value)}
            label={option.label}
            onChange={(checked) => handleChange(option.value, checked)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CheckBoxFilter;
