import React, { useState } from "react";
import { ZigTablePropsInfiniteQuery, ZigTableQueryParams } from "./types";
import ZigTableData from "./ZigTableData";
import { PaginationState } from "@tanstack/react-table";

export default function ZigTableRtkInfiniteQuery<T extends object, V extends ZigTableQueryParams>({
  query,
  queryExtraParams = {} as V,
  ...props
}: ZigTablePropsInfiniteQuery<T, V>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 30,
  });
  const { isLoading, data } = query({ ...queryExtraParams, limit: 30, from: "" });
  return (
    <ZigTableData
      {...props}
      data={data?.items || []}
      manualPagination
      loading={isLoading}
      pagination={pagination}
      onPaginationChange={setPagination}
    />
  );
}
