import ZigDropdown from "components/display/ZigDropdown";
import React, { useMemo, useState } from "react";
import { CheckboxFilterDropdownProps } from "./type";
import { DropdownItem } from "../../styles";
import CheckBoxFilter from "../../filters/CheckBoxFilter";
import { DropdownResetButton } from "../atoms/DropdownResetButton";
import { DropdownLabel } from "../atoms/DropdownLabel";
import { useLongestString } from "../util";
import { FiltersCount } from "../atoms/FilterCount";
import MobileFilterButton from "../atoms/MobileFilterButton";
import MobileFilterDrawer from "../atoms/MobileFilterDrawer";
import { Box } from "@mui/material";

const FILTERS_COUNT_WIDTH = 16;

const CheckboxFilterDropdown = ({
  filter,
  onChange,
  id = "",
  resetFilter,
  minSpace,
  mobile,
}: CheckboxFilterDropdownProps) => {
  const stringAll = "All";
  const stringNone = "None";

  const displayValue = useMemo(() => {
    if (!filter.value) return stringAll;
    const options = filter.options.filter((option) => filter.value?.includes(option.value));
    return options.length > 0 ? options.length : stringNone;
  }, [filter.value]);

  const longestWidth = useLongestString([stringAll, stringNone]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  if (mobile) {
    return (
      <>
        <MobileFilterDrawer
          filters={filter}
          onChange={onChange}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          resetFilters={resetFilter}
        />
        <MobileFilterButton
          id={`filters__checkbox-button-${filter.id}`}
          onClick={() => setDrawerOpen(true)}
          value={
            typeof displayValue === "number" ? (
              <Box display={"flex"} gap="6px" alignItems={"center"}>
                {filter.label}: <FiltersCount>{displayValue}</FiltersCount>
              </Box>
            ) : (
              `${filter.label}: ${displayValue}`
            )
          }
        />
      </>
    );
  }

  return (
    <ZigDropdown
      id={id}
      component={({ open }) => (
        <DropdownItem active={open}>
          <DropdownLabel
            minSpace={minSpace ?? Math.max(longestWidth, FILTERS_COUNT_WIDTH)}
            label={filter.label}
            value={
              typeof displayValue === "number" ? (
                <FiltersCount>{displayValue}</FiltersCount>
              ) : (
                displayValue
              )
            }
          />
        </DropdownItem>
      )}
      options={[
        {
          element: (
            <CheckBoxFilter
              filter={{ ...filter, label: "" }}
              onChange={(f) => {
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
