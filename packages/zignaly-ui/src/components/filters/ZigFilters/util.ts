import { ZigFiltersPruned, ZigFiltersType } from "./types";

export const FilterFns = {
  // https://github.com/TanStack/table/blob/main/packages/table-core/src/filterFns.ts
  inNumberRange: (value: number, [min, max]: [number | null, number | null]) => {
    return ((!min && min !== 0) || value >= min) && ((!max && max !== 0) || value <= max);
  },
};

/**
 * Load filters from default filters, applying saved filter values.
 */
export const loadFilters = (
  defaultFilters: ZigFiltersType,
  savedFilterValues: ZigFiltersPruned = [],
): ZigFiltersType => {
  return defaultFilters.map((filter) => {
    const savedFilter = savedFilterValues.find(
      (savedFilter) => savedFilter.id === filter.id && savedFilter.type === filter.type,
    );
    return {
      ...filter,
      value: savedFilter?.value ?? filter.value,
    };
  }) as ZigFiltersType;
};

/**
 * Prune filters to only save the minimum data needed to restore the filters.
 */
export const pruneFilters = (filters: ZigFiltersType): ZigFiltersPruned => {
  return filters.map(({ id, value, type }) => ({
    id,
    value,
    type,
  }));
};
