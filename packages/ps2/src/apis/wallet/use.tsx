import { useTransactionsHistoryQuery } from './api';
import useInfinitePaginatedQuery from 'util/hooks/useInfinitePaginatedQuery';

export function useTransactionsHistory(
  filters: {
    limit?: number;
    type?: string;
  } = {},
  pageIndex = 0,
) {
  const infinitePaginatedQuery = useInfinitePaginatedQuery(
    useTransactionsHistoryQuery,
    filters,
    pageIndex,
    false,
  );

  return infinitePaginatedQuery;
}
