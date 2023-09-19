import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { isArray } from "lodash-es";
import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { useDeepCompareEffect, useUpdateEffect } from "react-use";
import { ref } from "yup";
import { PaginationState } from "@tanstack/react-table";

export type PaginationMetadata = {
  from: string;
  length: number;
};

export interface InfiniteQueryResponse<T> {
  items: T[];
  metadata?: PaginationMetadata;
}

const useInfinitePaginatedQuery2 = ({ useQuery, queryExtraParams, initialLimit }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialLimit || 30,
  });
  const from = useRef("");
  const reset = useCallback(() => {
    setPagination((v) => ({ ...v, pageIndex: 0 }));
    from.current = "";
  }, [from]);

  const queryResponse = useQuery(
    {
      ...(queryExtraParams || {}),
      limit: pagination.pageSize,
      from: from.current,
    },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    from.current = queryResponse.data?.metadata?.from || "";
  }, [queryResponse.data]);

  useEffect(reset, [pagination.pageSize]);
  useDeepCompareEffect(reset, [queryExtraParams]);

  return {
    pagination,
    setPagination,
    ...queryResponse,
    hasMore: queryResponse?.data?.items?.length === pagination.pageSize,
  };
};

export default useInfinitePaginatedQuery2;
