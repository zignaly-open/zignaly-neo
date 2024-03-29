import { useState, useEffect, useCallback, SetStateAction, Dispatch } from "react";
import { useDeepCompareEffect } from "react-use";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { RtkQueryLikeFinitePagination } from "../types";

const useFinitePaginatedQuery = <T extends object, V extends object>({
  useQuery,
  queryExtraParams,
  sorting,
  initialLimit,
}: {
  useQuery: RtkQueryLikeFinitePagination<T, V>;
  queryExtraParams?: V;
  sorting?: SortingState;
  initialLimit?: number;
}): {
  pagination: PaginationState;
  totalPages: number;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  hasMore: boolean;
} & ReturnType<RtkQueryLikeFinitePagination<T, V>> => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialLimit || 30,
  });
  const reset = useCallback(() => {
    setPagination((v) => ({ ...v, pageIndex: 0 }));
  }, []);

  const queryResponse = useQuery(
    {
      ...(queryExtraParams || ({} as V)),
      ...(sorting?.[0]
        ? {
            sort: sorting[0].id,
            direction: sorting[0].desc ? "DESC" : "ASC",
          }
        : {}),
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
    },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(reset, [pagination.pageSize]);
  useDeepCompareEffect(reset, [queryExtraParams]);

  return {
    pagination,
    setPagination,
    totalPages: queryResponse?.data?.metadata?.totalPages || 0,
    ...queryResponse,
    hasMore: true,
  };
};

export default useFinitePaginatedQuery;
