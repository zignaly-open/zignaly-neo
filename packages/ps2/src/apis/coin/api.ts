import { createApi } from '@reduxjs/toolkit/query/react';
import { Coins } from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  baseQuery,
  reducerPath: 'coinApi',
  endpoints: (builder) => ({
    coins: builder.query<Coins, string>({
      query: (exchangeInternalId) => ({
        url: `user/exchanges/${exchangeInternalId}/assets`,
        params: {
          view: 'reduced',
          convert: false,
        },
      }),
    }),
  }),
});

export const { useCoinsQuery } = api;
