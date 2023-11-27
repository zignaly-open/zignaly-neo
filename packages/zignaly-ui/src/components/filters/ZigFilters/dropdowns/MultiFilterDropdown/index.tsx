import ZigDropdown from "components/display/ZigDropdown";
import ZigTypography from "components/display/ZigTypography";
import React from "react";
import SliderFilter from "../../filters/SliderFilter";
import { FiltersCount, LayoutItem } from "./styles";
import { FilterItemProps, MultiFilterDropdownProps } from "./type";
import { Tune } from "@mui/icons-material";
import CheckBoxFilter from "../../filters/CheckBoxFilter";
import { ZigFilter } from "../../types";
import ZigButton from "components/inputs/ZigButton";
import { ZigSettingsIcon } from "../../../../../icons";
import { DropdownItem } from "../../styles";

const MultiFilterDropdown = ({ resetFilters, filters, onChange }: MultiFilterDropdownProps) => {
  const getFilterComponent = (filter: ZigFilter) => {
    switch (filter.type) {
      case "slider":
        return { element: <SliderFilter filter={filter} onChange={onChange} /> };
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
            id: `filter-option-${index}`,
            label: option.label,
          })),
        };
    }
  };

  return (
    <ZigDropdown
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
                variant={"text"}
                // component={"p"}
                sx={{
                  textAlign: "center",
                  p: "4px 9px 3px",
                  fontSize: "14px",
                  width: "100%",
                }}
                // color={"links"}
                onClick={resetFilters}
              >
                reset
              </ZigButton>
            ),
            // id: "filters__reset",
            // onClick: () => {},
          },
        ])}
    />
  );
};

export default MultiFilterDropdown;
