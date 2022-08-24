import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../baseQuery';

export const api = createApi({
  reducerPath: 'balancesApi',
  baseQuery,
  endpoints: (builder) => ({
    /* Get the balances with a reduced data */
    reducedBalances: builder.query<any, any>({
      query: (internalId) => ({
        url: `user/exchanges/${internalId}/assets`,
        params: {
          view: 'reduced',
        },
      }),
    }),

    /* Get all coins of a exchange */
    allCoins: builder.query<any, any>({
      query: (exchangeType) => ({
        url: `coins/zgly_${exchangeType}`,
      }),
    }),
  }),
});

export const { useLazyReducedBalancesQuery, useLazyAllCoinsQuery } = api;
