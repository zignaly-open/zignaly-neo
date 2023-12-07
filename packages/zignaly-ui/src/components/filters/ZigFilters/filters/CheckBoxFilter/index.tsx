import { Box } from "@mui/material";
import React from "react";
import { CheckBoxFilterProps } from "./type";
import ZigTypography from "components/display/ZigTypography";
import CheckBox from "components/inputs/CheckBox";
import { CheckboxFilter } from "../../types";

const CheckBoxFilter = ({ filter, onChange }: CheckBoxFilterProps) => {
  const { label, options, value, id } = filter;

  const handleChange = (o: string, checked: boolean) => {
    // If null value, fill it with all options
    let updatedValue: CheckboxFilter["value"] = [...(value ?? options.map((o) => o.value))];

    if (checked) {
      if (!updatedValue.includes(o)) {
        updatedValue.push(o);
      }
      // If all values are checked, just set value to null
      if (options.every((o) => updatedValue?.includes(o.value))) {
        updatedValue = null;
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
      {options.map((option, i) => (
        <Box py="6px" key={option.value}>
          <CheckBox
            id={`filter-checkbox_${id}__option-${i}`}
            value={!value || value?.includes(option.value)}
            label={option.label}
            onChange={(checked) => handleChange(option.value, checked)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CheckBoxFilter;
