import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../baseQuery';
import { Coins, Balances, DepositInfo } from './types';

export const api = createApi({
  reducerPath: 'myBalancesApi',
  baseQuery,
  endpoints: (builder) => ({
    /* Get the myBalances with a reduced data */
    reducedBalances: builder.query<Balances, string>({
      query: (internalId) => ({
        url: `user/exchanges/${internalId}/assets`,
        params: {
          view: 'reduced',
        },
      }),
    }),

    /* Get all coins of an exchange */
    allCoins: builder.query<Coins, string>({
      query: (exchangeType) => ({
        url: `coins/zgly_${exchangeType}`,
      }),
    }),

    depositInfo: builder.query<
      DepositInfo,
      { exchangeId: string; networkId: string; coinId: string }
    >({
      query: ({ exchangeId, coinId, networkId }) => ({
        url: `/user/exchanges/${exchangeId}/deposit_address/${coinId}?network=${networkId}`,
      }),
    }),
  }),
});

export const {
  useLazyReducedBalancesQuery,
  useLazyAllCoinsQuery,
  useLazyDepositInfoQuery,
  useDepositInfoQuery,
} = api;
