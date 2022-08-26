import { createApi } from '@reduxjs/toolkit/query/react';
import { Coins, Investment, InvestmentDetails } from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  baseQuery,
  reducerPath: 'dashboardApi',
  endpoints: (builder) => ({
    investments: builder.query<Investment[], string>({
      query: (exchangeInternalId) => ({
        url: 'user/exchanges/' + exchangeInternalId + '/investments',
      }),
    }),
    coins: builder.query<Coins, string>({
      query: (exchangeInternalId) => ({
        url: `user/exchanges/${exchangeInternalId}/assets?reduced=true`,
      }),
    }),
    investmentDetails: builder.query<
      InvestmentDetails,
      { exchangeInternalId: string; serviceId: string }
    >({
      query: ({ exchangeInternalId, serviceId }) => ({
        url: `user/exchanges/${exchangeInternalId}/${serviceId}`,
      }),
    }),
  }),
});

export const {
  useLazyInvestmentsQuery,
  useInvestmentsQuery,
  useCoinsQuery,
  useInvestmentDetailsQuery,
} = api;
