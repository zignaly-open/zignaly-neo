import { createApi } from '@reduxjs/toolkit/query/react';
import {
  Investor,
  TraderService,
  TraderServiceBalance,
  TraderServiceFull,
  TraderServiceManagement,
  TransferPayload,
} from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  baseQuery,
  reducerPath: 'serviceApi',
  endpoints: (builder) => ({
    traderServices: builder.query<TraderService[], void>({
      query: () => ({
        url: 'services/list',
      }),
    }),
    traderServiceDetails: builder.query<TraderServiceFull, string>({
      query: (id) => ({
        url: `services/${id}`,
      }),
    }),
    traderServiceManagement: builder.query<TraderServiceManagement, string>({
      query: (id) => ({
        url: `services/${id}/management`,
      }),
    }),
    traderServiceBalance: builder.query<TraderServiceBalance, string>({
      query: (id) => ({
        url: `services/${id}/balances`,
      }),
    }),
    traderServiceInvestors: builder.query<Investor[], string>({
      query: (id) => ({
        url: `services/${id}/investors`,
      }),
    }),
    traderServiceUpdateScaMinimum: builder.mutation<
      void,
      { minimum: string; serviceId: string }
    >({
      query: ({ serviceId, minimum }) => ({
        url: `services/${serviceId}/sca`,
        method: 'PUT',
        body: { minimum },
      }),
    }),
    traderServiceTransferFunds: builder.mutation<
      void,
      { serviceId: string } & TransferPayload
    >({
      query: ({ serviceId, ...payload }) => ({
        url: `services/${serviceId}/transfer`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useTraderServiceInvestorsQuery,
  useLazyTraderServiceInvestorsQuery,
  useTraderServiceDetailsQuery,
  useTraderServiceBalanceQuery,
  useTraderServiceManagementQuery,
  useTraderServiceUpdateScaMinimumMutation,
  useLazyTraderServicesQuery,
  useTraderServiceTransferFundsMutation,
  useTraderServicesQuery,
} = api;
