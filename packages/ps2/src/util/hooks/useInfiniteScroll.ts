import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useState, useEffect } from 'react';

export type PaginationMetadata = {
  from: string;
  length: number;
};

export interface InfiniteQueryResponse<T> {
  items: T[];
  metadata: PaginationMetadata;
}

const useInfiniteQuery = (
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useGetDataListQuery: UseQuery<any>,
  { limit = 10, ...queryParameters },
) => {
  const [localPage, setLocalPage] = useState({ page: 1, id: '' });
  const [combinedData, setCombinedData] = useState([]);
  const queryResponse = useGetDataListQuery({
    limit,
    ...queryParameters,
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

export default useInfiniteQuery;
