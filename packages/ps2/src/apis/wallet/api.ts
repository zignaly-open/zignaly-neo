import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CoinBalances,
  CoinDetails,
  DepositInfo,
  PriceInfo,
  TotalSavings,
  Transactions,
  TransactionType,
  WalletBalances,
  WalletCoins,
  WithdrawFeeInfo,
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

    depositInfo: builder.query<DepositInfo, { network: string; coin: string }>({
      query: ({ coin, network }) => ({
        url: `${process.env.REACT_APP_WALLET_API}/generate-address/${network}/currency/${coin}`,
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
        url: `${process.env.REACT_APP_WALLET_API}/make-withdraw/${network}/currency/${coin}`,
        body: rest,
      }),
      // invalidateTags delayed to allow for the withdrawal to be processed
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   await queryFulfilled;
      //   setTimeout(() => {
      //     dispatch(api.util.invalidateTags(['Balance']));
      //   }, 5000);
      // },
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
        url: `${process.env.REACT_APP_WALLET_API}/user/exchanges/${exchangeInternalId}/transactions_history_csv`,
        method: 'POST',
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
        url: `${process.env.REACT_APP_WALLET_API}/generate-buy-price`,
        method: 'POST',
        body: params,
      }),
    }),

    generateWithdrawFee: builder.query<
      WithdrawFeeInfo,
      {
        network: string;
        coin: string;
      }
    >({
      query: ({ network, coin }) => ({
        url: `${process.env.REACT_APP_WALLET_API}/generate-fee/${network}/currency/${coin}`,
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
} = api;
