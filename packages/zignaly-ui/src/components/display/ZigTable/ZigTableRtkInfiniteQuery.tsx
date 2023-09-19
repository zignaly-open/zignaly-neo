import React from "react";
import { ZigTablePropsInfiniteQuery, ZigTableQueryParams } from "./types";
import ZigTableData from "./ZigTableData";
import useInfinitePaginatedQuery from "./use/useInfinitePaginatedQuery";

export default function ZigTableRtkInfiniteQuery<T extends object, V extends ZigTableQueryParams>({
  useQuery,
  queryExtraParams,
  queryDataMapper,
  ...props
}: ZigTablePropsInfiniteQuery<T, V>) {
  const { pagination, setPagination, isFetching, isLoading, hasMore, data } =
    useInfinitePaginatedQuery({
      useQuery,
      queryExtraParams,
    });

  const items = (queryDataMapper ? data?.items?.map(queryDataMapper) : data?.items) || [];
  return (
    <ZigTableData
      {...props}
      data={items}
      pageCount={hasMore ? -1 : pagination.pageIndex + 1}
      manualPagination
      loading={isLoading}
      fetching={isFetching}
      pagination={pagination}
      onPaginationChange={setPagination}
    />
  );
}
