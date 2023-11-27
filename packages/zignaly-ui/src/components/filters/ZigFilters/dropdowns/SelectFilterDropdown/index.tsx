import ZigDropdown from "components/display/ZigDropdown";
import ZigTypography from "components/display/ZigTypography";
import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { LayoutItem } from "./styles";
import { SelectFilterDropdownProps } from "./type";
import { ExpandLess, ChevronRight } from "@mui/icons-material";
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
          <Box display="flex" gap={1} justifyContent="center">
            <ZigTypography fontSize={13} color={"neutral300"}>
              {filter.label}
            </ZigTypography>
            <ZigTypography fontSize={14} color={"neutral100"}>
              {displayValue}
            </ZigTypography>
            {open ? <ExpandLess /> : <ChevronRight />}
          </Box>
        </DropdownItem>
      )}
      options={filter.options.map((option, index) => ({
        active: filter.value === option.value,
        onClick: () => onChange({ ...filter, value: option.value }),
        id: `drawer-account-switcher-dropdown__account-${index}`,
        label: option.label,
      }))}
    />
  );
};

export default SelectFilterDropdown;
