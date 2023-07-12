import { MarketplaceService } from './types';
import baseApiPs2 from '../baseApiPs2';
import { injectEndpoints } from 'apis/util';
import { maybeOverrideEndpoint } from '../../whitelabel';

export const api = injectEndpoints(baseApiPs2, (builder) => ({
  marketplace: builder.query<MarketplaceService[], void>({
    providesTags: ['Marketplace'],
    query: () => ({
      // yes, / is required and it won't work withouy it
      url: maybeOverrideEndpoint('marketplace/'),
    }),
  }),
}));

export const { useMarketplaceQuery } = api;
