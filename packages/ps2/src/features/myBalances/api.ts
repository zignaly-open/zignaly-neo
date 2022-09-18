import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../baseQuery';
import { Coins, Balances } from './types';

export const api = createApi({
  reducerPath: 'myBalancesApi',
  baseQuery,
  endpoints: (builder) => ({
    reducedBalances: builder.query<Balances, string>({
      query: (internalId) => ({
        url: `user/exchanges/${internalId}/assets`,
        params: {
          view: 'reduced',
        },
      }),
    }),
    allCoins: builder.query<Coins, string>({
      query: (exchangeType) => ({
        url: `coins/zgly_${exchangeType}`,
      }),
    }),
  }),
});

export const { useLazyReducedBalancesQuery, useLazyAllCoinsQuery } = api;
