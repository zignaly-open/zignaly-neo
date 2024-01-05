import { useMemo } from "react";
import { ZigFiltersType } from "./types";
import { filterData } from "./util";

/**
 * Filter a collection of objects based on a set of filters.
 * @param collection
 * @param filters
 * @param filtersDataMap Function that maps data with filters. If not provided, the properties
 * will be fetched by filter id. Map to an array if it can match multiple values.
 */
export const useFilteredCollection = <T extends object>(
  collection: T[],
  filters: ZigFiltersType,
  filtersDataMap?: (data: T) => object,
) => {
  return useMemo(() => {
    return collection.filter((data) => {
      const values = filtersDataMap ? filtersDataMap(data) : data;
      return filters?.every((filter) => {
        // Ignore filters with no column match
        if (!values.hasOwnProperty(filter.id)) return true;

        const value = values[filter.id];
        return Array.isArray(value)
          ? value.some((v) => filterData(filter, v))
          : filterData(filter, value);
      });
    });
  }, [collection, filters, filtersDataMap]);
};
