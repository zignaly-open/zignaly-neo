import React, { useMemo } from "react";
import { FilterDropdownWrapper } from "../../styles";
import { FilterDropdownProps } from "./type";
import CheckboxFilterDropdown from "../CheckboxFilterDropdown";
import SelectFilterDropdown from "../SelectFilterDropdown";
import SliderFilterDropdown from "../SliderFilterDropdown";
import { VertDivider } from "./styles";

const FilterDropdown = ({
  resetFilter,
  filter,
  onChange,
  separator,
  mobile,
  prefixId,
  position,
}: FilterDropdownProps) => {
  const Component = useMemo(() => {
    if (filter.type === "slider") {
      return SliderFilterDropdown;
    } else if (filter.type === "select") {
      return SelectFilterDropdown;
    } else if (filter.type === "checkbox") {
      return CheckboxFilterDropdown;
    }
    return null;
  }, [filter.type]);

  if (!Component) return null;

  return (
    <FilterDropdownWrapper mobile={mobile}>
      <Component
        mobile={mobile}
        resetFilter={resetFilter}
        filter={filter as never}
        onChange={onChange}
        prefixId={prefixId}
        position={position}
      />
      {separator && <VertDivider orientation="vertical" flexItem />}
    </FilterDropdownWrapper>
  );
};

export default FilterDropdown;
