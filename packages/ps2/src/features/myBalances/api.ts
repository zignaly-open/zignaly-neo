import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../baseQuery';

export const api = createApi({
  reducerPath: 'myBalancesApi',
  baseQuery,
  endpoints: (builder) => ({
    /* Get the myBalances with a reduced data */
    reducedBalances: builder.query<object[], string>({
      query: (internalId) => ({
        url: `user/exchanges/${internalId}/assets`,
        params: {
          view: 'reduced',
        },
      }),
    }),

    /* Get all coins of an exchange */
    allCoins: builder.query<object[], string>({
      query: (exchangeType) => ({
        url: `coins/zgly_${exchangeType}`,
      }),
    }),
  }),
});

export const { useLazyReducedBalancesQuery, useLazyAllCoinsQuery } = api;
