import ZigDropdown from "components/display/ZigDropdown";
import React, { useMemo } from "react";
import { SelectFilterDropdownProps } from "./type";
import { DropdownItem } from "../../styles";
import { useLongestString } from "../util";
import { DropdownLabel } from "../atoms/DropdownLabel";

const SelectFilterDropdown = ({ filter, onChange, id = "" }: SelectFilterDropdownProps) => {
  const displayValue = useMemo(() => {
    const option = filter.options.find((option) => option.value === filter.value);
    return option?.label ?? "";
  }, [filter.value]);

  const longestWidth = useLongestString(filter.options.map((o) => o.label));

  return (
    <ZigDropdown
      id={id}
      component={({ open }) => (
        <DropdownItem active={open}>
          <DropdownLabel minSpace={longestWidth + 100} label={filter.label} value={displayValue} />
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
