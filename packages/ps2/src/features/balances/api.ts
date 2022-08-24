import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../baseQuery';

export const api = createApi({
  reducerPath: 'balancesApi',
  baseQuery,
  endpoints: (builder) => ({
    /* Get the balances with a reduced data */
    reducedBalances: builder.query<object[], void>({
      query: (internalId) => ({
        url: `user/exchanges/${internalId}/assets`,
        params: {
          view: 'reduced',
        },
      }),
    }),

    /* Get all coins of an exchange */
    allCoins: builder.query<object[], void>({
      query: (exchangeType) => ({
        url: `coins/zgly_${exchangeType}`,
      }),
    }),
  }),
});

export const { useLazyReducedBalancesQuery, useLazyAllCoinsQuery } = api;
