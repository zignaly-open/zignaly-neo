import ZigDropdown from "components/display/ZigDropdown";
import React, { useMemo } from "react";
import { SelectFilterDropdownProps } from "./type";
import { DropdownItem } from "../../styles";
import { useLongestString } from "../util";
import { DropdownLabel } from "../atoms/DropdownLabel";
import MobileFilterButton from "../atoms/MobileFilterButton";
import { ZigFilter } from "../../types";

const SelectFilterDropdown = ({
  filter,
  onChange,
  mobile,
  resetFilter,
  prefixId,
  position,
}: SelectFilterDropdownProps) => {
  const displayValue = useMemo(() => {
    const option = filter.options.find((option) => option.value === filter.value);
    return option?.label ?? "";
  }, [filter.value, filter.options]);

  const longestWidth = useLongestString(filter.options.map((o) => o.label));

  if (mobile) {
    return (
      <MobileFilterButton
        filter={filter}
        onChange={onChange as (filter: ZigFilter) => void}
        resetFilter={resetFilter}
        label={displayValue}
        prefixId={prefixId}
      />
    );
  }

  return (
    <ZigDropdown
      id={`${prefixId}__select-${filter.id}`}
      position={position}
      component={({ open }) => (
        <DropdownItem active={open}>
          <DropdownLabel minSpace={longestWidth} label={filter.label} value={displayValue} />
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
