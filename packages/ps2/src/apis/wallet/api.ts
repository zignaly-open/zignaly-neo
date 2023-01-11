import { createApi } from '@reduxjs/toolkit/query/react';
import {
  DepositInfo,
  FilterValues,
  PriceInfo,
  TotalSavings,
  Transactions,
  WalletBalances,
  WalletCoins,
  WithdrawFeeInfo,
} from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  baseQuery: baseQuery(process.env.REACT_APP_WALLET_API),
  reducerPath: 'walletApi',
  tagTypes: ['Balance', 'WalletTransactions'],
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
      providesTags: ['Balance'],
    }),

    savings: builder.query<TotalSavings, void>({
      query: () => ({
        url: process.env.REACT_APP_WALLET_API + '/total-savings',
      }),
    }),

    depositInfo: builder.query<DepositInfo, { network: string; coin: string }>({
      query: ({ coin, network }) => ({
        url: `generate-address/${network}/currency/${coin}`,
        method: 'POST',
      }),
    }),

    withdraw: builder.mutation<
      { id: string },
      {
        network: string;
        memo: string;
        coin: string;
        address: string;
        amount: string;
        fee: string;
        code?: string;
      }
    >({
      query: ({ network, coin, ...rest }) => ({
        url: `make-withdraw/${network}/currency/${coin}`,
        body: rest,
        method: 'POST',
      }),
      // invalidateTags delayed to allow for the withdrawal to be processed
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        setTimeout(() => {
          dispatch(api.util.invalidateTags(['Balance', 'WalletTransactions']));
        }, 5000);
      },
    }),

    transactionsHistory: builder.query<
      Transactions,
      {
        type: FilterValues;
      }
    >({
      query: (params) => {
        return {
          url: '/get-operations',
          params,
        };
      },
      providesTags: ['WalletTransactions'],
    }),

    downloadTransactionsHistory: builder.mutation<void, void>({
      query: () => ({
        url: `history.csv`,
        responseHandler: async (response) => {
          const href = await URL.createObjectURL(await response.blob());
          Object.assign(document.createElement('a'), {
            href,
            download: 'transactions.csv',
          }).click();
        },
        cache: 'no-cache',
        headers: {
          'content-type': '',
        },
      }),
    }),

    generateBuyPrice: builder.query<
      PriceInfo,
      {
        from: string;
        to: string;
      }
    >({
      query: (params) => ({
        url: `generate-buy-price`,
        method: 'POST',
        body: params,
      }),
    }),

    buy: builder.mutation<
      { id: string },
      {
        price: string;
        amount: string;
        exchangeInternalId: string;
      }
    >({
      query: (params) => ({
        url: `buy-coin`,
        method: 'POST',
        body: params,
      }),
      // invalidateTags delayed to allow for the withdrawal to be processed
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        setTimeout(() => {
          dispatch(api.util.invalidateTags(['Balance', 'WalletTransactions']));
        }, 5000);
      },
    }),

    generateWithdrawFee: builder.query<
      WithdrawFeeInfo,
      {
        network: string;
        coin: string;
      }
    >({
      query: ({ network, coin }) => ({
        url: `generate-fee/${network}/currency/${coin}`,
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
  useDepositInfoQuery,
  useGenerateBuyPriceQuery,
  useGenerateWithdrawFeeQuery,
  useWithdrawMutation,
  useBuyMutation,
  useDownloadTransactionsHistoryMutation,
} = api;
