import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useState, useEffect, useCallback } from 'react';

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
  // const [fromId, setFromId] = useState('');
  const [combinedData, setCombinedData] = useState([]);
  const queryResponse = useGetDataListQuery({
    limit,
    ...queryParameters,
    from: localPage.id,
  });
  const { transactions: fetchData = [], metadata } =
    (queryResponse?.data as InfiniteListQueryResponse<
      typeof useGetDataListQuery
    >) || {};

  useEffect(() => {
    if (localPage.page === 1) setCombinedData(fetchData);
    else setCombinedData((previousData) => [...previousData, ...fetchData]);
  }, [fetchData]);

  const refresh = useCallback(() => {
    setLocalPage({ page: 1, id: '' });
  }, []);

  const readMore = () => {
    setLocalPage(({ page }) => ({ page: page + 1, id: metadata.from }));
  };

  return {
    data: combinedData,
    page: localPage.page,
    hasMore: fetchData.length === limit,
    readMore,
    refresh,
    isLoading: queryResponse?.isLoading,
    isFetching: queryResponse?.isFetching,
  };
};

export default useInfiniteScroll;
