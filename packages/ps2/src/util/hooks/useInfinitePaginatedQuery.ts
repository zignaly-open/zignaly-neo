import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useState, useEffect, useRef } from 'react';
import { useUpdateEffect } from 'react-use';

export type PaginationMetadata = {
  from: string;
  length: number;
};

export interface InfiniteQueryResponse<T> {
  items: T[];
  metadata: PaginationMetadata;
}

const useInfinitePaginatedQuery = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useGetDataListQuery: UseQuery<any>,
  params: Record<string, string | number>,
) => {
  const { limit = 10 } = params;
  // Keep params as reference so we don't trigger a refresh when they change
  const localParams = useRef(params);
  const [localPage, setLocalPage] = useState({ page: 1, id: '' });
  const [combinedData, setCombinedData] = useState([]);
  const queryResponse = useGetDataListQuery({
    ...localParams.current,
    from: localPage.id,
  });
  const { items: fetchData, metadata } =
    (queryResponse?.data as InfiniteQueryResponse<
      typeof useGetDataListQuery
    >) || {};

  useEffect(() => {
    if (localPage.page === 1) setCombinedData(fetchData);
    else setCombinedData((previousData) => [...previousData, ...fetchData]);
  }, [fetchData]);

  const refresh = () => {
    setLocalPage({ page: 1, id: '' });
  };

  useUpdateEffect(() => {
    localParams.current = params;
    refresh();
  }, Object.values(params));

  const fetchMore = () => {
    setLocalPage(({ page }) => ({ page: page + 1, id: metadata.from }));
  };

  return {
    ...queryResponse,
    data: combinedData,
    page: localPage.page,
    hasMore: fetchData?.length === limit,
    fetchMore,
    refresh,
  };
};

export default useInfinitePaginatedQuery;
