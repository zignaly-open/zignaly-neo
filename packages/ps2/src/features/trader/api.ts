import { createApi } from '@reduxjs/toolkit/query/react';
import {
  Investor,
  TraderService,
  TraderServiceFull,
  TraderServiceManagement,
} from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  baseQuery,
  reducerPath: 'traderApi',
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
    traderServiceInvestors: builder.query<Investor[], string>({
      query: (id) => ({
        url: `services/${id}/investors`,
      }),
    }),
  }),
});

export const {
  useTraderServiceInvestorsQuery,
  useLazyTraderServiceInvestorsQuery,
  useTraderServiceDetailsQuery,
  useTraderServiceManagementQuery,
  useLazyTraderServicesQuery,
  useTraderServicesQuery,
} = api;
