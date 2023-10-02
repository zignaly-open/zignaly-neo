import React, { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import { ZigTablePropsFiniteQuery, ZigTableQueryParams, ZigTableQueryRef } from "./types";
import ZigTableData from "./ZigTableData";
import useFinitePaginatedQuery from "./use/useFinitePaginatedQuery";

const ZigTableRtkFiniteQuery = <T extends object, V extends ZigTableQueryParams>(
  { useQuery, queryExtraParams, queryDataMapper, ...props }: ZigTablePropsFiniteQuery<T, V>,
  ref: ForwardedRef<ZigTableQueryRef>,
) => {
  const { pagination, setPagination, isFetching, isLoading, totalPages, data, refetch } =
    useFinitePaginatedQuery({
      useQuery,
      queryExtraParams,
    });

  useImperativeHandle(ref, () => ({
    refetch
  }));

  const items = (queryDataMapper ? data?.data?.map(queryDataMapper) : data?.data) || [];
  return (
    <ZigTableData
      {...props}
      manualPagination
      data={items}
      pageCount={totalPages}
      loading={isLoading}
      fetching={isFetching}
      pagination={pagination}
      onPaginationChange={setPagination}
    />
  );
};

export default forwardRef(ZigTableRtkFiniteQuery) as <
  T extends object,
  V extends ZigTableQueryParams,
>(
  props: ZigTablePropsFiniteQuery<T, V> & { ref?: ForwardedRef<ZigTableQueryRef> },
) => ReturnType<typeof ZigTableRtkFiniteQuery>;
