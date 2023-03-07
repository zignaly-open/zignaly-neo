import { MarketplaceService } from './types';
import emptySplitApi from '../baseApiPs2';

export const api = emptySplitApi.injectEndpoints({
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
