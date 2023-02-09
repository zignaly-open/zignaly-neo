import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import _isArray from 'lodash/isArray';
import { useState, useEffect, useRef } from 'react';
import { useDeepCompareEffect, useUpdateEffect } from 'react-use';

export type PaginationMetadata = {
  from: string;
  length: number;
};

export interface InfiniteQueryResponse<T> {
  items: T[];
  metadata?: PaginationMetadata;
}

const useInfinitePaginatedQuery = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useGetDataListQuery: UseQuery<any>,
  params: Record<string, string | number> & { limit?: number },
  pageIndex: number,
  hasMetadata: boolean,
) => {
  // Keep params as reference so we don't trigger a refresh when they change
  const localParams = useRef(params);
  const { limit = 10 } = localParams.current;
  const [localPage, setLocalPage] = useState({ page: 1, id: '' });
  const [combinedData, setCombinedData] = useState([]);

  const queryResponse = useGetDataListQuery({
    ...localParams.current,
    limit,
    ...(hasMetadata
      ? { from: localPage.id }
      : { offset: (localPage.page - 1) * limit }),
  });

  type InfiniteQueryResponseType = InfiniteQueryResponse<
    typeof useGetDataListQuery
  >;
  const data = queryResponse.data
    ? _isArray(queryResponse.data)
      ? queryResponse.data
      : (queryResponse.data as InfiniteQueryResponseType).items
    : [];

  useDeepCompareEffect(() => {
    if (localPage.page === 1) setCombinedData(data);
    else setCombinedData((previousData) => [...previousData, ...data]);
  }, [data]);

  const refresh = () => {
    setLocalPage({ page: 1, id: '' });
  };

  useUpdateEffect(() => {
    localParams.current = params;
    refresh();
  }, Object.values(params));

  useEffect(() => {
    if (!queryResponse.isFetching && data.length < pageIndex * limit + 1) {
      fetchMore();
    }
  }, [pageIndex]);

  const fetchMore = () => {
    setLocalPage(({ page }) => ({
      page: page + 1,
      id: (queryResponse.data as InfiniteQueryResponseType).metadata?.from,
    }));
  };

  return {
    ...queryResponse,
    data: combinedData,
    page: localPage.page,
    hasMore: data?.length === limit,
    fetchMore,
    refresh,
  };
};

export default useInfinitePaginatedQuery;
