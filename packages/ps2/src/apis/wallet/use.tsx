import { useTransactionsHistoryQuery } from './api';
import useInfinitePaginatedQuery from 'util/hooks/useInfinitePaginatedQuery';
import { TransactionType } from './types';

export function useTransactionsHistory(
  filters: {
    limit?: number;
    type?: TransactionType;
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
