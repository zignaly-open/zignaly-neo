import { useState, useEffect, useRef, useCallback, SetStateAction, Dispatch } from "react";
import { useDeepCompareEffect } from "react-use";
import { PaginationState } from "@tanstack/react-table";
import { RtkQueryLikeInfinitePagination } from "../types";

const useInfinitePaginatedQuery = <T extends object, V extends object>({
  useQuery,
  queryExtraParams,
  initialLimit,
}: {
  useQuery: RtkQueryLikeInfinitePagination<T, V>;
  queryExtraParams?: V;
  initialLimit?: number;
}): {
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  hasMore: boolean;
} & ReturnType<RtkQueryLikeInfinitePagination<T, V>> => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialLimit || 30,
  });
  const from = useRef<Record<number, string>>({});
  const reset = useCallback(() => {
    setPagination((v) => ({ ...v, pageIndex: 0 }));
    from.current = {};
  }, [from]);

  const queryResponse = useQuery(
    {
      ...(queryExtraParams || ({} as V)),
      limit: pagination.pageSize,
      from: from.current?.[pagination.pageIndex] || "",
    },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (from.current && queryResponse?.data)
      from.current[pagination.pageIndex + 1] = queryResponse?.data?.metadata?.from || "";
  }, [queryResponse?.data]);

  useEffect(reset, [pagination.pageSize]);
  useDeepCompareEffect(reset, [queryExtraParams]);

  return {
    pagination,
    setPagination,
    ...queryResponse,
    hasMore: queryResponse?.data?.items?.length === pagination.pageSize,
  };
};

export default useInfinitePaginatedQuery;
