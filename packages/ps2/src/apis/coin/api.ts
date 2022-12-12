import { createApi } from '@reduxjs/toolkit/query/react';
import { CoinBalances, CoinDetails, DepositInfo, Transactions } from './types';
import baseQuery from '../baseQuery';
import { isEmpty, omitBy } from 'lodash';

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
      providesTags: ['Balance'],
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
      // invalidateTags delayed to allow for the withdrawal to be processed
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        setTimeout(() => {
          dispatch(api.util.invalidateTags(['Balance']));
        }, 5000);
      },
    }),

    transactionsHistory: builder.query<
      Transactions,
      {
        exchangeInternalId: string;
        from?: string;
        limit?: string;
        type?: string;
      }
    >({
      query: ({ exchangeInternalId, from, limit, type }) => {
        const searchParams = new URLSearchParams(
          omitBy({ from, limit, type }, isEmpty),
        );
        const url = `user/exchanges/${exchangeInternalId}/transactions_history?=${searchParams}`;
        return {
          url,
        };
      },
    }),
  }),
});

export const {
 
  useCoinsQuery,
 
  useAllCoinsQuery,
 
  useDepositInfoQuery,
 ,
  useWithdrawMutation,
useTransactionsHistoryQuery,
} = api;
