import { Box } from "@mui/material";
import React from "react";
import { SelectFilterProps } from "./type";
import ZigTypography from "components/display/ZigTypography";
import { Check } from "@mui/icons-material";

const SelectFilter = ({ filter, onChange, mobile }: SelectFilterProps) => {
  const { label, options, value, id } = filter;

  return (
    <Box display={"flex"} flexDirection={"column"}>
      {label && (
        <ZigTypography component={"div"} pb={1} id={`filter-select-${id}__label`}>
          {label}
        </ZigTypography>
      )}
      {options.map((option, i) => (
        <Box
          display={"flex"}
          paddingY={mobile ? "7px" : "6px"}
          key={option.value}
          onClick={() => onChange({ ...filter, value: option.value })}
          id={`filter-select-${id}__option-${i}`}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flex={1}
            color={value === option.value ? "highlighted" : "neutral300"}
            sx={{ cursor: "pointer" }}
          >
            <ZigTypography color="inherit" variant={mobile ? "body2" : "body1"} lineHeight={"24px"}>
              {option.label}
            </ZigTypography>
            {value === option.value && <Check />}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SelectFilter;
