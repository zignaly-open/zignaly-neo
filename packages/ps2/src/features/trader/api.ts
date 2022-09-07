import { createApi } from '@reduxjs/toolkit/query/react';
import { TraderService } from './types';
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
    traderService: builder.query<TraderService, string>({
      query: (id) => ({
        url: `services/${id}`,
      }),
    }),
  }),
});

export const {
  useTraderServiceQuery,
  useLazyTraderServicesQuery,
  useTraderServicesQuery,
} = api;
