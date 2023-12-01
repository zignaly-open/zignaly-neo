// https://github.com/TanStack/table/blob/main/packages/table-core/src/filterFns.ts

import { ZigFiltersSavedValue, ZigFiltersSavedValues, ZigFiltersType } from "./types";

export const FilterFns = {
  // inNumberRange: (value: number, filterValue: ZigFiltersSavedValue) => {
  //   if (!Array.isArray(filterValue)) return false;
  //   const [min, max] = filterValue;
  //   return ((!min && min !== 0) || value >= min) && ((!max && max !== 0) || value <= max);
  // },
  inNumberRange: (value: number, [min, max]: [number | null, number | null]) => {
    return ((!min && min !== 0) || value >= min) && ((!max && max !== 0) || value <= max);
  },
};

export const loadFilters = (
  defaultFilters: ZigFiltersType,
  savedFilterValues: ZigFiltersSavedValues = [],
) => {
  return defaultFilters.map((filter) => {
    const savedFilter = savedFilterValues.find((savedFilter) => savedFilter.id === filter.id);
    return {
      ...filter,
      value: savedFilter?.value ?? filter.value,
    };
  });
};
