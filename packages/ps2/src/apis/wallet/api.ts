import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CoinBalances,
  CoinDetails,
  DepositInfo,
  TotalSavings,
  Transactions,
  TransactionType,
  WalletBalances,
  WalletCoins,
} from './types';
import baseQuery from '../baseQuery';
import { isString, pickBy } from 'lodash';

export const api = createApi({
  baseQuery,
  reducerPath: 'walletApi',
  endpoints: (builder) => ({
    coins: builder.query<WalletCoins, void>({
      query: () => ({
        url: process.env.REACT_APP_WALLET_API + '/get-currencies',
      }),
    }),

    balance: builder.query<WalletBalances, void>({
      query: () => ({
        url: process.env.REACT_APP_WALLET_API + '/get-balance',
      }),
    }),

    savings: builder.query<TotalSavings, void>({
      query: () => ({
        url: process.env.REACT_APP_WALLET_API + '/total-savings',
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
        type: TransactionType;
      }
    >({
      query: (params) => {
        return {
          url: `${
            process.env.REACT_APP_WALLET_API
          }/get-operations?${new URLSearchParams(params).toString()}`,
        };
      },
    }),

    transactionsHistoryCsv: builder.mutation<
      { id: string },
      {
        exchangeInternalId: string;
      }
    >({
      query: ({ exchangeInternalId }) => ({
        url: `/user/exchanges/${exchangeInternalId}/transactions_history_csv`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useBalanceQuery,
  useCoinsQuery,
  useSavingsQuery,
  useTransactionsHistoryQuery,
} = api;
