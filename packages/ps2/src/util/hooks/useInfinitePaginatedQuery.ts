import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useState, useEffect } from 'react';
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
  const [localPage, setLocalPage] = useState({ page: 1, id: '' });
  const [combinedData, setCombinedData] = useState([]);
  const queryResponse = useGetDataListQuery({
    ...params,
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

  useUpdateEffect(refresh, Object.values(params));

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
