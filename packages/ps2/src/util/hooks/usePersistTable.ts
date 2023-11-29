import { filterTable, sortTable } from 'apis/settings/store';
import { RootState } from 'apis/store';
import { isEmpty } from 'lodash-es';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateEffect } from 'react-use';

/**
 * A hook to persist table sorting and filtering.
 * @param id Table id
 * @param watchFilters Optional filters to automatically persist.
 * Or you can use the `filterTable` function returned by this hook instead.
 * @returns watchSorting Optional sorting to automatically persist, like `watchFilters`.
 */
export const usePersistTable = (id: string, watchFilters, watchSorting) => {
  const { sorting, filters } = useSelector(
    (store: RootState) =>
      store.settings.table[id] ?? { sorting: undefined, filters: undefined },
  );
  const dispatch = useDispatch();

  useUpdateEffect(() => {
    if (watchFilters) {
      dispatch(filterTable({ id, filters: watchFilters }));
    }
  }, [watchFilters]);

  useUpdateEffect(() => {
    if (watchSorting) {
      dispatch(sortTable({ id, sorting: newSorting[0] }));
    }
  }, [watchSorting]);

  return {
    sorting: isEmpty(sorting) ? null : [sorting],
    filters,
    sortTable: (newSorting) =>
      dispatch(sortTable({ id, sorting: newSorting[0] })),
    filterTable: (newFilters) =>
      dispatch(filterTable({ id, filters: newFilters })),
  };
};
