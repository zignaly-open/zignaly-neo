import ZigDropdown from "components/display/ZigDropdown";
import React, { useMemo, useState } from "react";
import { SelectFilterDropdownProps } from "./type";
import { DropdownItem } from "../../styles";
import { useLongestString } from "../util";
import { DropdownLabel } from "../atoms/DropdownLabel";
import MobileFilterDrawer from "../atoms/MobileFilterDrawer";
import MobileFilterButton from "../atoms/MobileFilterButton";

const SelectFilterDropdown = ({
  filter,
  onChange,
  id = "",
  mobile,
  resetFilter,
}: SelectFilterDropdownProps) => {
  const displayValue = useMemo(() => {
    const option = filter.options.find((option) => option.value === filter.value);
    return option?.label ?? "";
  }, [filter.value]);

  const longestWidth = useLongestString(filter.options.map((o) => o.label));

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
          id={`filters__select-button-${filter.id}`}
          onClick={() => setDrawerOpen(true)}
          value={`${filter.label}: ${displayValue}`}
        />
      </>
    );
  }

  return (
    <ZigDropdown
      id={id}
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
