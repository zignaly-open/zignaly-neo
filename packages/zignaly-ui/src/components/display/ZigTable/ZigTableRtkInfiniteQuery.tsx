import React, { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import { ZigTablePropsInfiniteQuery, ZigTableQueryParams, ZigTableQueryRef } from "./types";
import ZigTableData from "./ZigTableData";
import useInfinitePaginatedQuery from "./use/useInfinitePaginatedQuery";

const ZigTableRtkInfiniteQuery = <T extends object, V extends ZigTableQueryParams>(
  {
    useInfiniteQuery,
    queryExtraParams,
    queryDataMapper,
    ...props
  }: ZigTablePropsInfiniteQuery<T, V>,
  ref: ForwardedRef<ZigTableQueryRef>,
) => {
  const { pagination, setPagination, isFetching, isLoading, hasMore, data, refetch } =
    useInfinitePaginatedQuery({
      useInfiniteQuery,
      queryExtraParams,
    });

  useImperativeHandle(ref, () => ({
    refetch,
  }));

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
};

export default forwardRef(ZigTableRtkInfiniteQuery) as <
  T extends object,
  V extends ZigTableQueryParams,
>(
  props: ZigTablePropsInfiniteQuery<T, V> & { ref?: ForwardedRef<ZigTableQueryRef> },
) => ReturnType<typeof ZigTableRtkInfiniteQuery>;
