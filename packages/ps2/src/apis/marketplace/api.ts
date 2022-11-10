import { createApi } from '@reduxjs/toolkit/query/react';
import { MarketplaceService } from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  baseQuery,
  reducerPath: 'marketplaceApi',
  tagTypes: ['MarketplaceService'],
  endpoints: (builder) => ({
    marketplace: builder.query<MarketplaceService[], void>({
      providesTags: ['MarketplaceService'],
      query: () => ({
        url: 'marketplace/',
      }),
    }),
  }),
});

export const { useMarketplaceQuery } = api;
