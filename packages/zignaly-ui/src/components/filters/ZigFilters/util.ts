import { SliderFilter, ZigFiltersPruned, ZigFiltersType } from "./types";

export const filterFns = {
  // https://github.com/TanStack/table/blob/main/packages/table-core/src/filterFns.ts
  inNumberRange: (value: [number | null, number | null], filterValue: number) => {
    if (!Array.isArray(value)) return false;
    const [min, max] = value;
    return (
      ((!min && min !== 0) || filterValue >= min) && ((!max && max !== 0) || filterValue <= max)
    );
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
    let { value } = filter;

    if (savedFilter) {
      // Apply saved value
      value = savedFilter.value;

      if (filter.type === "slider" && Array.isArray(value)) {
        const newValue = [...value];
        // Check that value is still within range
        if (filter.min !== undefined && (value[0] as number) < filter.min) {
          newValue[0] = null;
        }
        if (filter.max !== undefined && (value[1] as number) > filter.max) {
          newValue[1] = null;
        }
        value = newValue as SliderFilter["value"];
      }
    }

    return {
      ...filter,
      value,
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
