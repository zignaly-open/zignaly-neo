import { CheckboxFilter, SliderFilter, ZigFilter, ZigFiltersPruned, ZigFiltersType } from "./types";

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

const checkFilterValue = (filter: ZigFilter, value: ZigFilter["value"]): ZigFilter["value"] => {
  if (!value) return value;

  if (filter.type === "slider" && Array.isArray(value)) {
    const newValue = [...value];
    // Check that value is still within range
    if (filter.min !== undefined && (value[0] as number) < filter.min) {
      newValue[0] = null;
    }
    if (filter.max !== undefined && (value[1] as number) > filter.max) {
      newValue[1] = null;
    }
    return newValue as SliderFilter["value"];
  } else if (filter.type === "select") {
    // Check that value is still in options
    if (!filter.options.find((option) => option.value === value)) {
      return filter.value;
    }
  } else if (filter.type === "checkbox") {
    // Check that values are still in options
    if (
      !(value as CheckboxFilter["value"])!.every((val) =>
        filter.options.find((option) => option.value === val),
      )
    ) {
      return filter.value;
    }
  }

  return value;
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
      value = checkFilterValue(filter, savedFilter.value);
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

export const filterData = (filter: ZigFilter, value: string | number) => {
  if (!filter || filter.value === "" || filter.value === null || filter.value === undefined)
    return true;

  if (filter.type === "slider")
    return filterFns.inNumberRange(value as number, filter.value as [number, number]);
  else if (filter.type === "checkbox") return filter.value.includes(value);
  else if (filter.type === "select") return filter.value === value;
  else if (filter.type === "text") {
    return filterFns.includesString(value as string, filter.value);
  }
  return true;
};
