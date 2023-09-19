import React, { useLayoutEffect, useState } from "react";
import { ZigTablePropsInfiniteQuery, ZigTableQueryParams } from "./types";
import ZigTableData from "./ZigTableData";
import { PaginationState } from "@tanstack/react-table";
import useInfinitePaginatedQuery from "../../../hooks/useInfinitePaginatedQuery";

export default function ZigTableRtkInfiniteQuery<T extends object, V extends ZigTableQueryParams>({
  query,
  queryExtraParams,
  queryDataMapper,
  ...props
}: ZigTablePropsInfiniteQuery<T, V>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 30,
  });
  const endpoint = useInfinitePaginatedQuery(
    query,
    { ...(queryExtraParams || {}), limit: pagination.pageSize },
    pagination.pageIndex,
    true,
    { refetchOnMountOrArgChange: true },
  );

  useLayoutEffect(() => {
    // Reset pagination when infinite query is refreshed from filter change
    if (endpoint.page === 1) {
      setPagination((p) => ({ ...p, pageIndex: 0 }));
    }
  }, [endpoint.page]);

  return (
    <ZigTableData
      {...props}
      data={endpoint.data?.map(queryDataMapper || ((x) => x)) || []}
      pageCount={endpoint.hasMore ? -1 : endpoint.page}
      manualPagination
      loading={endpoint.isLoading}
      fetching={endpoint.isFetching}
      pagination={pagination}
      onPaginationChange={setPagination}
    />
  );
}
