import ZigDropdown from "components/display/ZigDropdown";
import React, { useMemo, useState } from "react";
import SliderFilter from "../../filters/SliderFilter";
import { SliderFilterDropdownProps } from "./type";
import { DropdownItem } from "../../styles";
import { DropdownResetButton } from "../atoms/DropdownResetButton";
import { DropdownLabel } from "../atoms/DropdownLabel";
import ZigSelect from "components/inputs/ZigSelect";
import ZigButton from "components/inputs/ZigButton";
import ZigTypography from "components/display/ZigTypography";
import MobileFilterButton from "../atoms/MobileFilterButton";
import MobileFilterDrawer from "../atoms/MobileFilterDrawer";

const SliderFilterDropdown = ({
  resetFilter,
  filter,
  onChange,
  id = "",
  minSpace = 65,
  mobile,
}: SliderFilterDropdownProps) => {
  const displayValue = useMemo(() => {
    if (Array.isArray(filter.value)) {
      if (filter.value[0] === null && filter.value[1] === null) return "All";
      else if (filter.value[0] === null) return `< ${filter.value[1]}%`;
      else if (filter.value[1] === null) return `> ${filter.value[0]}%`;
      else return `${filter.value[0]}%-${filter.value[1]}%`;
    }
    return filter.value?.toString();
  }, [filter.value]);

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
          id={`filters__slider-mobile-${filter.id}-reset`}
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
          <DropdownLabel minSpace={minSpace} label={filter.label} value={displayValue} />
        </DropdownItem>
      )}
      options={[
        {
          element: (
            <SliderFilter
              filter={{ ...filter, label: "" }}
              onChange={(f) => onChange({ ...f, label: filter.label })}
            />
          ),
        },
        { separator: true },
        {
          element: (
            <DropdownResetButton
              id={`filters__slider-dropdown-${filter.id}-reset`}
              onClick={resetFilter}
            />
          ),
        },
      ]}
    />
  );
};

export default SliderFilterDropdown;
