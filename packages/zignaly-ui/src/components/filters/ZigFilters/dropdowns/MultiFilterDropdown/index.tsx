import ZigDropdown from "components/display/ZigDropdown";
import React, { useCallback, useMemo } from "react";
import SliderFilter from "../../filters/SliderFilter";
import { LayoutItem } from "./styles";
import { MultiFilterDropdownProps } from "./type";
import CheckBoxFilter from "../../filters/CheckBoxFilter";
import { ZigFilter } from "../../types";
import { ZigSettingsIcon } from "../../../../../icons";
import { DropdownResetButton } from "../atoms/DropdownResetButton";
import { isEqual } from "lodash-es";
import { FiltersCount } from "../atoms/FilterCount";

const MultiFilterDropdown = ({
  resetFilters,
  filters,
  defaultFilters,
  onChange,
  minSpace = 90,
}: MultiFilterDropdownProps) => {
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

  return (
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
  );
};

export default MultiFilterDropdown;
