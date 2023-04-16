import { useTransactionsHistoryQuery } from './api';
import useInfinitePaginatedQuery from 'util/hooks/useInfinitePaginatedQuery';
export function useTransactionsHistory(filters, pageIndex) {
    if (filters === void 0) { filters = {}; }
    if (pageIndex === void 0) { pageIndex = 0; }
    var infinitePaginatedQuery = useInfinitePaginatedQuery(useTransactionsHistoryQuery, filters, pageIndex, false);
    return infinitePaginatedQuery;
}
//# sourceMappingURL=use.js.map