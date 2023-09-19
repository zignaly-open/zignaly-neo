import React, { useEffect, useState } from "react";
import { ZigTablePropsInfiniteQuery, ZigTableQueryParams } from "./types";
import ZigTableData from "./ZigTableData";
import { PaginationState } from "@tanstack/react-table";
import useInfinitePaginatedQuery from "../../../hooks/useInfinitePaginatedQuery";

export default function ZigTableRtkInfiniteQuery<T extends object, V extends ZigTableQueryParams>({
  query,
  queryExtraParams = {} as V,
  queryDataMapper,
  ...props
}: ZigTablePropsInfiniteQuery<T, V>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 30,
  });
  const endpoint = useInfinitePaginatedQuery(
    query,
    { ...queryExtraParams, limit: pagination.pageSize },
    pagination.pageIndex,
    true,
    { refetchOnMountOrArgChange: true },
  );

  debugger;
  // const endpoint = query({ ...queryExtraParams, limit: pagination.pageSize, from: "" });
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    if (endpoint.data) {
      let items = endpoint.data;
      if (queryDataMapper) {
        items = items?.map(queryDataMapper);
      }
      setData(items);
    }
  }, [endpoint.data]);
  return (
    <ZigTableData
      {...props}
      data={data || []}
      pageCount={endpoint.hasMore ? -1 : endpoint.page}
      manualPagination
      loading={endpoint.isLoading}
      fetching={endpoint.isFetching}
      pagination={pagination}
      onPaginationChange={setPagination}
    />
  );
}
