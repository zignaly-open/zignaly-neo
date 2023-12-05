import ZigDropdown from "components/display/ZigDropdown";
import React, { useCallback } from "react";
import SliderFilter from "../../filters/SliderFilter";
import { FiltersCount, LayoutItem } from "./styles";
import { MultiFilterDropdownProps } from "./type";
import CheckBoxFilter from "../../filters/CheckBoxFilter";
import { ZigFilter } from "../../types";
import ZigButton from "components/inputs/ZigButton";
import { ZigSettingsIcon } from "../../../../../icons";

const MultiFilterDropdown = ({ resetFilters, filters, onChange }: MultiFilterDropdownProps) => {
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

  return (
    <ZigDropdown
      id={`filters__multi-dropdown`}
      component={({ open }) => (
        <LayoutItem active={open}>
          <ZigSettingsIcon width={22.5} height={19} />
          <FiltersCount>{filters.length}</FiltersCount>
        </LayoutItem>
      )}
      options={filters
        .flatMap((filter) => [getFilterComponent(filter), { separator: true }])
        .concat([
          {
            element: (
              <ZigButton
                id={`filters__multi-dropdown-reset`}
                variant={"text"}
                sx={{
                  textAlign: "center",
                  p: "4px 9px 3px",
                  fontSize: "14px",
                  width: "100%",
                }}
                onClick={resetFilters}
              >
                Reset
              </ZigButton>
            ),
          },
        ])}
    />
  );
};

export default MultiFilterDropdown;
