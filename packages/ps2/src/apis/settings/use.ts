import { createSelector } from '@reduxjs/toolkit';
import { SortingState } from '@tanstack/react-table';
import { loadFilters, pruneFilters } from '@zignaly-open/ui';
import { ZigFiltersType } from '@zignaly-open/ui/lib/components/filters/ZigFilters/types';
import { filterTable, sortTable } from 'apis/settings/store';
import {
  PersistTableDataFull,
  PersistTableDataPruned,
  TableId,
} from 'apis/settings/types';
import { RootState } from 'apis/store';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type IOverload = {
  (id: TableId, defaultFilters: ZigFiltersType): PersistTableDataFull;
  (id: TableId): PersistTableDataPruned;
};

const createTableDataSelector = (id: TableId) => {
  // Memoize the selector to avoid re-render issues.
  return createSelector(
    (store: RootState) => store.settings.table[id],
    (tableDataState) => {
      return tableDataState ?? { filters: [], sorting: [] };
    },
  );
};

const useTableData = (id: TableId) => {
  const selectTableData = useMemo(() => {
    return createTableDataSelector(id);
  }, [id]);
  return useSelector(selectTableData);
};

/**
 * A hook to persist table sorting and filtering.
 */
export const usePersistTable: IOverload = (
  id: TableId,
  defaultFilters?: ZigFiltersType,
) => {
  const { sorting, filters } = useTableData(id);
  const dispatch = useDispatch();
  const properFilters = useMemo(() => {
    return defaultFilters
      ? loadFilters(defaultFilters, filters)
      : (filters as ZigFiltersType);
  }, [filters, defaultFilters]);

  return {
    sorting: sorting ?? [],
    // loadFilters initially will apply saved filters to default filters.
    // And also convert redux pruned data to full filters.
    // We don't store the full filters data in redux to avoid bloating the store with data that can be outdated.
    filters: properFilters,
    sortTable: (newSorting: SortingState) =>
      dispatch(sortTable({ id, sorting: newSorting })),
    filterTable: (newFilters: ZigFiltersType) => {
      dispatch(filterTable({ id, filters: pruneFilters(newFilters) }));
    },
  };
};
