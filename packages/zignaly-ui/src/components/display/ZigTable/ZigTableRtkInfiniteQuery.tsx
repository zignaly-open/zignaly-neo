import React, { useLayoutEffect, useState } from "react";
import { ZigTablePropsInfiniteQuery, ZigTableQueryParams } from "./types";
import ZigTableData from "./ZigTableData";
import { PaginationState } from "@tanstack/react-table";
import useInfinitePaginatedQuery from "../../../hooks/useInfinitePaginatedQuery";
import useInfinitePaginatedQuery2 from "../../../hooks/useInfinitePaginatedQuery2";

export default function ZigTableRtkInfiniteQuery<T extends object, V extends ZigTableQueryParams>({
  query,
  queryExtraParams,
  queryDataMapper,
  ...props
}: ZigTablePropsInfiniteQuery<T, V>) {
  // const [pagination, setPagination] = useState<PaginationState>({
  //   pageIndex: 0,
  //   pageSize: 30,
  // });
  //
  // const {isFetching, isLoading, data: items, hasMore} = useInfinitePaginatedQuery(
  //   query,
  //   { ...(queryExtraParams || {}), limit: pagination.pageSize },
  //   pagination.pageIndex,
  //   true,
  //   { refetchOnMountOrArgChange: true },
  // );

  const shit = useInfinitePaginatedQuery2({
    useQuery: query,
    queryExtraParams,
    initialLimit: 10,
  });
  const { pagination, setPagination, isFetching, isLoading, hasMore, data } = shit;

  //
  // console.error(endpoint);
  //
  // useLayoutEffect(() => {
  //   // Reset pagination when infinite query is refreshed from filter change
  //   if (endpoint.page === 1) {
  //     setPagination((p) => ({ ...p, pageIndex: 0 }));
  //   }
  // }, [endpoint.page]);

  return (
    <ZigTableData
      {...props}
      data={data?.items?.map(queryDataMapper || ((x) => x)) || []}
      pageCount={hasMore ? -1 : pagination.pageIndex + 1}
      manualPagination
      loading={isLoading}
      fetching={isFetching}
      pagination={pagination}
      onPaginationChange={setPagination}
    />
  );
}
