import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useState, useEffect, useCallback, useMemo } from 'react';

export type PaginationMetadata = {
  from: string;
  length: number;
};

export interface InfiniteListQueryResponse<T> {
  items: T[];
  metadata: PaginationMetadata;
}

const useInfiniteScroll = (
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
    (queryResponse?.data as InfiniteListQueryResponse<
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

export default useInfiniteScroll;
