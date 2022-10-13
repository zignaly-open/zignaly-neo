import { createApi } from '@reduxjs/toolkit/query/react';
import { CoinBalances, CoinDetails } from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  baseQuery,
  reducerPath: 'coinApi',
  endpoints: (builder) => ({
    coins: builder.query<
      CoinBalances,
      { exchangeInternalId: string; convert?: boolean }
    >({
      query: ({ exchangeInternalId, convert = false }) => ({
        url: `user/exchanges/${exchangeInternalId}/assets`,
        params: {
          view: 'reduced',
          convert: convert,
        },
      }),
    }),

    allCoins: builder.query<CoinDetails, string>({
      query: (exchangeType) => ({
        url: `coins/zgly_${exchangeType}`,
      }),
    }),
  }),
});

export const { useCoinsQuery, useAllCoinsQuery } = api;
