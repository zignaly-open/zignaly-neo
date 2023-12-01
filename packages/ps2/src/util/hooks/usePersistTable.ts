import { SortingState } from '@tanstack/react-table';
import { loadFilters, pruneFilters } from '@zignaly-open/ui';
import { ZigFiltersType } from '@zignaly-open/ui/lib/components/filters/ZigFilters/types';
import { FILTERS_VERSION, filterTable, sortTable } from 'apis/settings/store';
import { TableId } from 'apis/settings/types';
import { RootState } from 'apis/store';
import { useDispatch, useSelector } from 'react-redux';

/**
 * A hook to persist table sorting and filtering.
 */
export const usePersistTable = (
  id: TableId,
  defaultFilters: ZigFiltersType,
) => {
  const tableData = useSelector(
    (store: RootState) =>
      store.settings.table[id] ?? { filters: [], sorting: [] },
  );
  const version = useSelector((store: RootState) => store.settings.version);
  const { sorting, filters } = tableData;
  const dispatch = useDispatch();

  return {
    sorting,
    // loadFilters initially will apply saved filters to default filters.
    // But also convert redux pruned data to full filters.
    // We don't store the full filters data in redux to avoid bloating the store with data that can be outdated.
    // We also override the saved filters if the version is outdated.
    filters:
      FILTERS_VERSION > version
        ? defaultFilters
        : loadFilters(defaultFilters, filters),
    sortTable: (newSorting: SortingState) =>
      dispatch(sortTable({ id, sorting: newSorting })),
    filterTable: (newFilters: ZigFiltersType) => {
      dispatch(filterTable({ id, filters: pruneFilters(newFilters) }));
    },
  };
};
