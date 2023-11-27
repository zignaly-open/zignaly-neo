import ZigDropdown from "components/display/ZigDropdown";
import ZigTypography from "components/display/ZigTypography";
import React, { useMemo } from "react";
import SliderFilter from "../../filters/SliderFilter";
import { Box } from "@mui/material";
import { ZigFilter, ZigFiltersType } from "../../types";
import { LayoutItem } from "./styles";
import { FilterItemProps, SelectFilterDropdownProps } from "./type";
import { ExpandLess, ChevronRight } from "@mui/icons-material";

const SelectFilterDropdown = ({ filter, onChange }: SelectFilterDropdownProps) => {
  const displayValue = useMemo(() => {
    const option = filter.options.find((option) => option.value === filter.value);
    return option.label;
  }, [filter.value]);

  return (
    <ZigDropdown
      component={({ open }) => (
        <LayoutItem active={open}>
          <Box display="flex" gap={1} justifyContent="center">
            <ZigTypography fontSize={13} color={"neutral300"}>
              {filter.label}
            </ZigTypography>
            <ZigTypography fontSize={14} color={"neutral100"}>
              {displayValue}
            </ZigTypography>
            {open ? <ExpandLess /> : <ChevronRight />}
          </Box>
        </LayoutItem>
      )}
      options={filter.options.map((option, index) => ({
        onClick: () => onChange(option.value),
        id: `drawer-account-switcher-dropdown__account-${index}`,
        label: option.label,
      }))}
    />
  );
};

export default SelectFilterDropdown;
