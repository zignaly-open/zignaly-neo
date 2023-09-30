import React from "react";
import { ZigTablePropsFiniteQuery, ZigTableQueryParams } from "./types";
import ZigTableData from "./ZigTableData";
import useFinitePaginatedQuery from "./use/useFinitePaginatedQuery";

export default function ZigTableRtkFiniteQuery<T extends object, V extends ZigTableQueryParams>({
  useQuery,
  queryExtraParams,
  queryDataMapper,
  ...props
}: ZigTablePropsFiniteQuery<T, V>) {
  const { pagination, setPagination, isFetching, totalPages, isLoading, data } =
    useFinitePaginatedQuery({
      useQuery,
      queryExtraParams,
    });

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
}
