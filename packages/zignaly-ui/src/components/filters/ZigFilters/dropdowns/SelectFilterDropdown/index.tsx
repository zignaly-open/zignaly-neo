import ZigDropdown from "components/display/ZigDropdown";
import ZigTypography from "components/display/ZigTypography";
import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { SelectFilterDropdownProps } from "./type";
import { DropdownItem } from "../../styles";

const SelectFilterDropdown = ({ filter, onChange }: SelectFilterDropdownProps) => {
  const displayValue = useMemo(() => {
    const option = filter.options.find((option) => option.value === filter.value);
    return option?.label;
  }, [filter.value]);

  return (
    <ZigDropdown
      component={({ open }) => (
        <DropdownItem active={open}>
          <Box display="flex" gap={2} justifyContent="center">
            <ZigTypography fontSize={13} color={"neutral300"}>
              {filter.label}
            </ZigTypography>
            <ZigTypography fontSize={14} color={"neutral100"}>
              {displayValue}
            </ZigTypography>
          </Box>
        </DropdownItem>
      )}
      options={filter.options.map((option, index) => ({
        active: filter.value === option.value,
        onClick: () => onChange({ ...filter, value: option.value }),
        id: `select-filter__option-${index}`,
        label: option.label,
      }))}
    />
  );
};

export default SelectFilterDropdown;
