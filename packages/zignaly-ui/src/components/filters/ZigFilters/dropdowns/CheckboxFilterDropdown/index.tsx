import ZigDropdown from "components/display/ZigDropdown";
import React, { useMemo } from "react";
import { CheckboxFilterDropdownProps } from "./type";
import { DropdownItem } from "../../styles";
import CheckBoxFilter from "../../filters/CheckBoxFilter";
import { DropdownResetButton } from "../atoms/DropdownResetButton";
import { DropdownLabel } from "../atoms/DropdownLabel";
import { useLongestString } from "../util";

const CheckboxFilterDropdown = ({
  filter,
  onChange,
  id = "",
  resetFilter,
  minSpace,
}: CheckboxFilterDropdownProps) => {
  const stringAll = "All";
  const stringNone = "None";

  const displayValue = useMemo(() => {
    if (!filter.value) return stringAll;
    const options = filter.options.filter((option) => filter.value?.includes(option.value));
    return options.length > 0
      ? options.length > 1
        ? options.length.toString()
        : options.map((o) => o.label).join(", ")
      : stringNone;
  }, [filter.value]);

  const longestWidth = useLongestString([
    stringAll,
    stringNone,
    ...filter.options.map((o) => o.label),
  ]);

  return (
    <ZigDropdown
      id={id}
      component={({ open }) => (
        <DropdownItem active={open}>
          <DropdownLabel
            minSpace={minSpace ?? longestWidth}
            label={filter.label}
            value={displayValue}
          />
        </DropdownItem>
      )}
      options={[
        {
          element: (
            <CheckBoxFilter
              filter={{ ...filter, label: "" }}
              onChange={(f) => {
                onChange({ ...f, label: filter.label });
              }}
            />
          ),
        },
        { separator: true },
        {
          element: (
            <DropdownResetButton
              id={`filters__checkbox-dropdown-${filter.id}-reset`}
              onClick={resetFilter}
            />
          ),
        },
      ]}
    />
  );
};

export default CheckboxFilterDropdown;
