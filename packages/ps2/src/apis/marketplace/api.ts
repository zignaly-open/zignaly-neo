import { MarketplaceService } from './types';
import baseApiPs2 from '../baseApiPs2';
import { injectEndpoints } from 'apis/util';

export const api = injectEndpoints(baseApiPs2, (builder) => ({
  marketplace: builder.query<MarketplaceService[], { geek?: boolean }>({
    providesTags: ['Marketplace'],
    query: (params) => ({
      url: 'market',
      params,
    }),
  }),
}));

export const { useMarketplaceQuery } = api;
