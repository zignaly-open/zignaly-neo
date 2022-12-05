import { createApi } from '@reduxjs/toolkit/query/react';
import { CoinBalances, CoinDetails, DepositInfo } from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  baseQuery,
  reducerPath: 'coinApi',
  tagTypes: ['Balance'],
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

    depositInfo: builder.query<
      DepositInfo,
      { exchangeId: string; networkId: string; coinId: string }
    >({
      query: ({ exchangeId, coinId, networkId }) => ({
        url: `/user/exchanges/${exchangeId}/deposit_address/${coinId}?network=${networkId}`,
      }),
    }),

    withdraw: builder.mutation<
      { id: string },
      {
        exchangeInternalId: string;
        network: string;
        asset: string;
        tag: string;
        address: string;
        amount: string;
        code?: string;
      }
    >({
      query: ({ exchangeInternalId, ...rest }) => ({
        url: `/user/exchanges/${exchangeInternalId}/withdraw`,
        method: 'POST',
        body: rest,
      }),
    }),
  }),
});

export const {
  useCoinsQuery,
  useAllCoinsQuery,
  useDepositInfoQuery,
  useWithdrawMutation,
} = api;
