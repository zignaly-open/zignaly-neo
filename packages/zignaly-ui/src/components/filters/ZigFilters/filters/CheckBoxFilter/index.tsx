import { Box } from "@mui/material";
import React from "react";
import { CheckBoxFilterProps } from "./type";
import ZigTypography from "components/display/ZigTypography";
import { CheckboxFilter } from "../../types";
import ZigCheckBox from "../../../../inputs/ZigCheckBox";

const CheckBoxFilter = ({ filter, onChange }: CheckBoxFilterProps) => {
  const { label, options, value, id } = filter;

  const handleChange = (o: string | number, checked: boolean) => {
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
        <ZigTypography component={"div"} pb={1} id={`filter-checkbox-${id}__label`}>
          {label}
        </ZigTypography>
      )}
      {options.map((option, i) => (
        <Box py="6px" key={option.value}>
          <ZigCheckBox
            variant={"outlined"}
            sx={{ margin: "0 9px", padding: 0 }}
            id={`filter-checkbox-${id}__option-${i}`}
            checked={!value || value?.includes(option.value)}
            label={option.label}
            onChange={(checked) => handleChange(option.value, checked.target.checked)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CheckBoxFilter;
