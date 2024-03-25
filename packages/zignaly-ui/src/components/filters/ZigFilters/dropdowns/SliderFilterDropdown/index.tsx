import ZigDropdown from "components/display/ZigDropdown";
import React, { useMemo } from "react";
import SliderFilter from "../../filters/SliderFilter";
import { SliderFilterDropdownProps } from "./type";
import { DropdownItem } from "../../styles";
import { DropdownResetButton } from "../atoms/DropdownResetButton";
import { DropdownLabel } from "../atoms/DropdownLabel";
import MobileFilterButton from "../atoms/MobileFilterButton";
import { ZigFilter } from "../../types";
import { useTranslation } from "react-i18next";

const SliderFilterDropdown = ({
  resetFilter,
  filter,
  onChange,
  minSpace = 65,
  mobile,
  prefixId,
  position,
}: SliderFilterDropdownProps) => {
  const { t } = useTranslation("zignaly-ui", { keyPrefix: "ZigFilters" });

  const displayValue = useMemo(() => {
    if (Array.isArray(filter.value)) {
      if (filter.value[0] === null && filter.value[1] === null) return t("all");
      else if (filter.value[0] === null) return `< ${filter.value[1]}%`;
      else if (filter.value[1] === null) return `> ${filter.value[0]}%`;
      else return `${filter.value[0]}%-${filter.value[1]}%`;
    }
    return filter.value?.toString();
  }, [filter.value]);

  if (mobile) {
    return (
      <MobileFilterButton
        filter={filter}
        onChange={onChange as (filter: ZigFilter) => void}
        resetFilter={resetFilter}
        label={`${filter.label}: ${displayValue}`}
        prefixId={prefixId}
      />
    );
  }

  return (
    <ZigDropdown
      id={`${prefixId}__dropdown-${filter.id}`}
      disabled={filter.disabled}
      component={({ open }) => (
        <DropdownItem active={open}>
          <DropdownLabel minSpace={minSpace} label={filter.label} value={displayValue} />
        </DropdownItem>
      )}
      position={position}
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
              id={`${prefixId}__slider-dropdown-${filter.id}-reset`}
              onClick={resetFilter}
            />
          ),
        },
      ]}
    />
  );
};

export default SliderFilterDropdown;
