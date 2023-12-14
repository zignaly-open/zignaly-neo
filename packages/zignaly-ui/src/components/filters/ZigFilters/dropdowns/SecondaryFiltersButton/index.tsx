import ZigDropdown from "components/display/ZigDropdown";
import React, { useCallback, useMemo, useState } from "react";
import SliderFilter from "../../filters/SliderFilter";
import { LayoutItem } from "./styles";
import { SecondaryFiltersButtonProps } from "./type";
import CheckBoxFilter from "../../filters/CheckBoxFilter";
import { ZigFilter } from "../../types";
import { ZigSettingsIcon } from "../../../../../icons";
import { DropdownResetButton } from "../atoms/DropdownResetButton";
import { isEqual } from "lodash-es";
import { FiltersCount } from "../atoms/FilterCount";
import { FilterDropdownWrapper } from "../../styles";
// todo: lazy?
import { Box, IconButton, SwipeableDrawer } from "@mui/material";
import ZigButton from "components/inputs/ZigButton";
import MobileFilterDrawer from "../atoms/MobileFilterDrawer";

const SecondaryFiltersButton = ({
  resetFilters,
  filters,
  defaultFilters,
  onChange,
  minSpace = 90,
  mobile = false,
}: SecondaryFiltersButtonProps) => {
  const getFilterComponent = useCallback(
    (filter: ZigFilter) => {
      switch (filter.type) {
        case "slider":
          return {
            element: <SliderFilter filter={filter} onChange={onChange} />,
          };
        case "checkbox":
          return {
            element: <CheckBoxFilter filter={filter} onChange={onChange} />,
          };
        case "select":
          // Not needed and not used at the moment
          return {
            id: `filter-select-${filter.id}`,
            label: filter.label,
            children: filter.options.map((option, index) => ({
              onClick: () => onChange(option.value),
              id: `filter-select__option-${index}`,
              label: option.label,
            })),
          };
      }
    },
    [onChange],
  );

  const filtersChangedCount = useMemo(() => {
    return filters.filter((filter) => {
      const defaultFilter = defaultFilters?.find((defaultFilter) => defaultFilter.id === filter.id);
      return !isEqual(filter.value, defaultFilter?.value);
    }).length;
  }, [filters, defaultFilters]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  if (mobile) {
    return (
      <ZigButton
        variant="outlined"
        sx={{ py: "3px", px: filtersChangedCount > 0 ? "10px" : "12px", minWidth: 0 }}
      >
        <MobileFilterDrawer
          filters={filters}
          onChange={onChange}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          resetFilters={resetFilters}
        />
        <Box display="flex" gap="6px" alignItems={"center"}>
          <ZigSettingsIcon width={19} height={16} onClick={() => setDrawerOpen(true)} />
          {filtersChangedCount > 0 && <FiltersCount>{filtersChangedCount}</FiltersCount>}
        </Box>
      </ZigButton>
    );
  }

  return (
    <FilterDropdownWrapper>
      <ZigDropdown
        id={`filters__multi-dropdown`}
        component={({ open }) => (
          <LayoutItem active={open} minWidth={minSpace}>
            <ZigSettingsIcon width={22.5} height={19} />
            {filtersChangedCount > 0 && <FiltersCount>{filtersChangedCount}</FiltersCount>}
          </LayoutItem>
        )}
        options={filters
          .flatMap((filter) => [getFilterComponent(filter), { separator: true }])
          .concat([
            {
              element: (
                <DropdownResetButton id={`filters__multi-dropdown-reset`} onClick={resetFilters} />
              ),
            },
          ])}
      />
    </FilterDropdownWrapper>
  );
};

export default SecondaryFiltersButton;
