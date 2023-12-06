import ZigDropdown from "components/display/ZigDropdown";
import ZigTypography from "components/display/ZigTypography";
import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { CheckboxFilterDropdownProps } from "./type";
import { DropdownItem } from "../../styles";
import CheckBoxFilter from "../../filters/CheckBoxFilter";
import { DropdownResetButton } from "../../DropdownResetButton";

const CheckboxFilterDropdown = ({
  filter,
  onChange,
  id = "",
  resetFilter,
}: CheckboxFilterDropdownProps) => {
  const displayValue = useMemo(() => {
    if (!filter.value) return "All";
    const options = filter.options.filter((option) => filter.value?.includes(option.value));
    return options.length > 0
      ? options.length > 8
        ? options.length
        : options.map((o) => o.label).join(", ")
      : "None";
  }, [filter.value]);

  return (
    <ZigDropdown
      id={id}
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
      options={[
        {
          element: (
            <CheckBoxFilter
              filter={{ ...filter, label: "" }}
              onChange={(f) => {
                console.log("omfg", f);
                onChange({ ...f, label: filter.label });
              }}
            />
          ),
        },
        { separator: true },
        {
          element: (
            <DropdownResetButton
              id={`filters__checkbox-dropdown-${filter.id}-reset`}
              onClick={resetFilter}
            />
          ),
        },
      ]}
    />
  );
};

export default CheckboxFilterDropdown;
