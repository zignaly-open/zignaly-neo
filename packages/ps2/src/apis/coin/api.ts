import { isString, pickBy } from 'lodash-es';
import {
  AccountCoinBalances,
  CoinBalances,
  CoinDetails,
  DepositInfo,
  Transactions,
  TransactionType,
} from './types';
import baseApiPs2 from '../baseApiPs2';
import { injectEndpoints } from 'apis/util';

export const api = injectEndpoints(baseApiPs2, (builder) => ({
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
    providesTags: ['Balance', 'Assets'],
  }),

  bulkCoins: builder.query<AccountCoinBalances, { exchangeAccounts: string[] }>(
    {
      async queryFn(
        { exchangeAccounts },
        _queryApi,
        _extraOptions,
        fetchWithBQ,
      ) {
        const doFetch = async (exchangeInternalId: string) => {
          const result = await fetchWithBQ(
            `user/exchanges/${exchangeInternalId}/assets?view=reduced&convert=false`,
          );
          if (result.error) throw result.error;
          return { exchangeInternalId, balances: result.data as CoinBalances };
        };

        try {
          const res = await Promise.all(exchangeAccounts.map(doFetch));
          return { data: res };
        } catch (e) {
          return { error: e };
        }
      },
    },
  ),

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
      }, 10000);
    },
  }),

  transactionsHistory: builder.query<
    Transactions,
    {
      exchangeInternalId: string;
      from?: string;
      limit?: number;
      type?: string;
    }
  >({
    query: ({ exchangeInternalId, ...params }) => {
      const searchParams = new URLSearchParams(
        pickBy({ ...params, limit: params.limit?.toString() }, isString),
      );
      return {
        url: `user/exchanges/${exchangeInternalId}/transactions_history?${searchParams.toString()}`,
      };
    },
  }),

  transactionsHistoryCsv: builder.mutation<
    { id: string },
    {
      exchangeInternalId: string;
      days: number;
      type?: TransactionType;
    }
  >({
    query: ({ exchangeInternalId, days, type }) => ({
      url: `/user/exchanges/${exchangeInternalId}/transactions_history_csv`,
      method: 'POST',
      params: {
        days,
        ...(type && { type }),
      },
    }),
  }),
  quoteAssetsCoin: builder.query<
    Array<string>,
    {
      exchangeInternalId: string;
      coinId: string;
    }
  >({
    query: ({ exchangeInternalId, coinId }) => ({
      url: `quote_assets/${exchangeInternalId}/${coinId}`,
    }),
  }),
  convertPreview: builder.query<
    { side: string; lastPrice: number; estimatedAmount: number; min: number },
    {
      from: string;
      qty: string;
      to: string;
    }
  >({
    query: ({ from, qty, to }) => ({
      url: `${from}/convert-preview`,
      method: 'POST',
      body: {
        from,
        qty,
        to,
      },
    }),
  }),
  convert: builder.mutation<
    {
      status: string;
      filled: number;
      remaining: number;
      feeCost: number;
      fee: number;
      id: string;
    },
    {
      exchangeInternalId: string;
      from: string;
      qty: number;
      to: string;
    }
  >({
    query: ({ exchangeInternalId, ...rest }) => ({
      url: `user/exchanges/${exchangeInternalId}/convert`,
      method: 'POST',
      body: {
        ...rest,
      },
    }),
  }),
}));

export const {
  useCoinsQuery,
  useBulkCoinsQuery,
  useAllCoinsQuery,
  useDepositInfoQuery,
  useWithdrawMutation,
  useTransactionsHistoryCsvMutation,
  useTransactionsHistoryQuery,
  useQuoteAssetsCoinQuery,
  useConvertPreviewQuery,
  useConvertMutation,
} = api;
