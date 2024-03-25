import ZigDropdown from "components/display/ZigDropdown";
import React, { useMemo } from "react";
import { CheckboxFilterDropdownProps } from "./type";
import { DropdownItem } from "../../styles";
import CheckBoxFilter from "../../filters/CheckBoxFilter";
import { DropdownResetButton } from "../atoms/DropdownResetButton";
import { DropdownLabel } from "../atoms/DropdownLabel";
import { useLongestString } from "../util";
import { FiltersCount } from "../atoms/FilterCount";
import MobileFilterButton from "../atoms/MobileFilterButton";
import { Box } from "@mui/material";
import { ZigFilter } from "../../types";
import { useTranslation } from "react-i18next";

const FILTERS_COUNT_WIDTH = 16;

const CheckboxFilterDropdown = ({
  filter,
  onChange,
  resetFilter,
  minSpace,
  mobile,
  prefixId,
  showFullSingleValue,
  position,
}: CheckboxFilterDropdownProps) => {
  const { t } = useTranslation("zignaly-ui", { keyPrefix: "ZigFilters" });
  const stringAll = t("all");
  const stringNone = t("none");

  const displayValue = useMemo(() => {
    if (!filter.value) return stringAll;
    const options = filter.options.filter((option) =>
      filter.value?.includes(option.value as string),
    );
    return options.length > 0
      ? options.length === 1 && showFullSingleValue
        ? options[0].label
        : options.length
      : stringNone;
  }, [filter.value, filter.options]);

  const longestWidth = useLongestString([
    stringAll,
    stringNone,
    ...(showFullSingleValue ? filter.options.map((o) => o.label) : []),
  ]);

  if (mobile) {
    return (
      <MobileFilterButton
        filter={filter}
        onChange={onChange as (filter: ZigFilter) => void}
        resetFilter={resetFilter}
        label={
          typeof displayValue === "number" ? (
            <Box display={"flex"} gap="6px" alignItems={"center"}>
              {`${filter.label}:`} <FiltersCount>{displayValue}</FiltersCount>
            </Box>
          ) : (
            `${filter.label}: ${displayValue}`
          )
        }
        prefixId={prefixId}
      />
    );
  }

  return (
    <ZigDropdown
      id={`${prefixId}__checkbox-${filter.id}`}
      position={position}
      component={({ open }) => (
        <DropdownItem active={open}>
          <DropdownLabel
            minSpace={minSpace ?? Math.max(longestWidth, FILTERS_COUNT_WIDTH)}
            label={filter.label}
            value={
              typeof displayValue === "number" ? (
                <FiltersCount>{displayValue}</FiltersCount>
              ) : (
                displayValue
              )
            }
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
