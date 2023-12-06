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
import { useDispatch, useSelector } from 'react-redux';

type IOverload = {
  (id: TableId, defaultFilters: ZigFiltersType): PersistTableDataFull;
  (id: TableId): PersistTableDataPruned;
};

/**
 * A hook to persist table sorting and filtering.
 */
export const usePersistTable: IOverload = (
  id: TableId,
  defaultFilters?: ZigFiltersType,
) => {
  const tableData = useSelector(
    (store: RootState) =>
      store.settings.table[id] ?? {
        filters: [],
        sorting: undefined as SortingState,
      },
  );
  const { sorting, filters } = tableData;
  const dispatch = useDispatch();

  return {
    sorting,
    // loadFilters initially will apply saved filters to default filters.
    // And also convert redux pruned data to full filters.
    // We don't store the full filters data in redux to avoid bloating the store with data that can be outdated.
    filters: defaultFilters
      ? loadFilters(defaultFilters, filters)
      : (filters as ZigFiltersType),
    sortTable: (newSorting: SortingState) =>
      dispatch(sortTable({ id, sorting: newSorting })),
    filterTable: (newFilters: ZigFiltersType) => {
      dispatch(filterTable({ id, filters: pruneFilters(newFilters) }));
    },
  };
};
