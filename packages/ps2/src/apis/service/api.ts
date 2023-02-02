import { createApi } from '@reduxjs/toolkit/query/react';
import {
  GraphChartType,
  GraphTimeframe,
  Investor,
  TraderService,
  TraderServiceBalance,
  TraderServiceFull,
  TraderServiceManagement,
  TraderServiceChart,
  TransferPayload,
  EditServicePayload,
  CreateServicePayload,
} from './types';
import baseQuery from '../baseQuery';
import { providesList } from 'apis/util';

export const api = createApi({
  baseQuery: baseQuery(),
  reducerPath: 'serviceApi',
  tagTypes: ['Service', 'ServiceChart'],
  endpoints: (builder) => ({
    traderServices: builder.query<TraderService[], void>({
      query: () => ({
        url: 'services/list',
      }),
      providesTags: (result) => providesList(result, 'Service', 'serviceId'),
    }),
    traderServiceDetails: builder.query<TraderServiceFull, string>({
      providesTags: (result, error, id) => [{ type: 'Service', id }],
      query: (id) => ({
        url: `services/${id}`,
      }),
    }),
    traderServiceGraph: builder.query<
      TraderServiceChart,
      { id: string; period: GraphTimeframe; chart: GraphChartType }
    >({
      providesTags: (result, error, { id }) => [{ type: 'ServiceChart', id }],
      query: ({ id, chart, period }) => ({
        url: `services/${id}/stats`,
        params: { chart, period },
      }),
    }),
    traderServiceManagement: builder.query<TraderServiceManagement, string>({
      providesTags: (result, error, id) => [{ type: 'Service', id }],
      query: (id) => ({
        url: `services/${id}/management`,
      }),
    }),
    traderServiceBalance: builder.query<TraderServiceBalance, string>({
      providesTags: (result, error, id) => [{ type: 'Service', id }],
      query: (id) => ({
        url: `services/${id}/balances`,
      }),
    }),
    traderServiceInvestors: builder.query<Investor[], string>({
      providesTags: (result, error, id) => [{ type: 'Service', id }],
      query: (id) => ({
        url: `services/${id}/investors`,
      }),
    }),
    traderServiceUpdateScaMinimum: builder.mutation<
      void,
      { minimum: string; serviceId: string }
    >({
      invalidatesTags: (result, error, args) => [
        { type: 'Service', id: args.serviceId },
      ],
      query: ({ serviceId, minimum }) => ({
        url: `services/${serviceId}/sca`,
        method: 'PUT',
        body: { minimum },
      }),
    }),
    createTraderService: builder.mutation<void, CreateServicePayload>({
      invalidatesTags: ['Service'],
      query: (payload) => ({
        url: `services/`,
        method: 'POST',
        body: payload,
      }),
    }),
    traderServiceTransferFunds: builder.mutation<
      void,
      { serviceId: string } & TransferPayload
    >({
      invalidatesTags: (result, error, args) => [
        { type: 'Service', id: args.serviceId },
      ],
      query: ({ serviceId, ...payload }) => ({
        url: `services/${serviceId}/transfer`,
        method: 'POST',
        body: payload,
      }),
    }),
    traderServiceEdit: builder.mutation<void, EditServicePayload>({
      invalidatesTags: (result, error, args) => [
        { type: 'Service', id: args.id },
      ],
      query: ({ id, ...payload }) => ({
        url: `services/${id}`,
        method: 'PUT',
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
  useTraderServiceGraphQuery,
  useTraderServiceManagementQuery,
  useCreateTraderServiceMutation,
  useTraderServiceUpdateScaMinimumMutation,
  useLazyTraderServicesQuery,
  useTraderServiceTransferFundsMutation,
  useTraderServicesQuery,
  useTraderServiceEditMutation,
} = api;
