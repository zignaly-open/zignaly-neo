import { ZigFiltersPruned, ZigFiltersType } from "./types";

export const filterFns = {
  // https://github.com/TanStack/table/blob/main/packages/table-core/src/filterFns.ts
  inNumberRange: (value: number, filterValue: [number | null, number | null]) => {
    if (!Array.isArray(filterValue)) return false;
    const [min, max] = filterValue;
    return ((!min && min !== 0) || value >= min) && ((!max && max !== 0) || value <= max);
  },
  includesString: (value: string, filterValue: string) => {
    return value.toLowerCase().includes(filterValue.toLowerCase());
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
      value: savedFilter ? savedFilter.value : filter.value,
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
