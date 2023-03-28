import { MarketplaceService } from './types';
import baseApiPs2 from '../baseApiPs2';
import { injectEndpoints } from 'apis/util';

export const api = injectEndpoints(baseApiPs2, (builder) => ({
  marketplace: builder.query<MarketplaceService[], void>({
    providesTags: ['MarketplaceService'],
    query: () => ({
      url: 'marketplace/',
    }),
  }),
}));

export const { useMarketplaceQuery } = api;
