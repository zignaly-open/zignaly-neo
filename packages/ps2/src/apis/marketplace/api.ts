import { MarketplaceService } from './types';
import baseApiPs2 from '../baseApiPs2';

export const api = baseApiPs2.injectEndpoints({
  overrideExisting: false,
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
