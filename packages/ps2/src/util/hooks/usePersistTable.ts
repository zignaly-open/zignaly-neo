import { ColumnSort } from '@tanstack/react-table';
import { loadFilters } from '@zignaly-open/ui';
import {
  ZigFiltersSavedValues,
  ZigFiltersType,
} from '@zignaly-open/ui/lib/components/filters/ZigFilters/types';
import { filterTable, sortTable } from 'apis/settings/store';
import { TableId } from 'apis/settings/types';
import { RootState } from 'apis/store';
import { isEmpty } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateEffect } from 'react-use';

/**
 * A hook to persist table sorting and filtering.
 * @param id Table id
 * @param watchFiltersValues Optional filters to automatically persist.
 * Or you can use the `filterTable` function returned by this hook instead.
 * @param watchSorting Optional sorting to automatically persist, like `watchFilters`.
 */
export const usePersistTable = (
  id: TableId,
  defaultFilters: ZigFiltersType,
  watchFiltersValues?: ZigFiltersSavedValues,
  watchSorting?: ColumnSort,
) => {
  const isFirstRenderRef = useRef(true);
  const initialValueRef = useRef();
  const tableData = useSelector((store: RootState) =>
    // isFirstRenderRef.current
    //   ? {
    //       filters: loadFilters(
    //         defaultFilters,
    //         store.settings.table[id]?.filters,
    //       ),
    //       sorting: store.settings.table[id]?.sorting,
    //     }
    //   : initialValueRef.current,
    ({
      filters: loadFilters(defaultFilters, store.settings.table[id]?.filters),
      sorting: store.settings.table[id]?.sorting,
    }),
  );
  initialValueRef.current = tableData;
  console.log(tableData);
  const { sorting, filters } = tableData;
  // const [filters, setFilters] = useState(tableData.filters);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
    }
    // else {
    //   setCachedSettings({ sorting, filters });
    // }
  }, []);

  useUpdateEffect(() => {
    if (watchFiltersValues) {
      dispatch(filterTable({ id, filters: watchFiltersValues }));
    }
  }, [watchFiltersValues]);

  useUpdateEffect(() => {
    if (watchSorting) {
      dispatch(sortTable({ id, sorting: newSorting }));
    }
  }, [watchSorting]);

  return {
    sorting: isEmpty(sorting) ? null : sorting,
    filters,
    sortTable: (newSorting) => dispatch(sortTable({ id, sorting: newSorting })),
    filterTable: (newFilters) => {
      // setFilters(newFilters);
      dispatch(filterTable({ id, filters: newFilters }));
    },
  };
};
