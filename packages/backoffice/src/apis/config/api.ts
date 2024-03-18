import baseApiBackoffice from '../baseApiBackoffice';
import { injectEndpoints } from 'apis/util';
import { WhitelabelBackendConfig } from './types';

export const api = injectEndpoints(baseApiBackoffice, (builder) => ({
  wlConfig: builder.query<WhitelabelBackendConfig, string>({
    query: (slug) => ({
      url: `wl_configuration/${slug}`,
      method: 'GET',
    }),
    providesTags: ['WlConfig'],
  }),
  saveWlConfig: builder.mutation<
    WhitelabelBackendConfig,
    { slug: string; data: WhitelabelBackendConfig }
  >({
    invalidatesTags: ['WlConfig'],
    query: ({ slug, data }) => ({
      url: `wl_configuration/${slug}`,
      method: 'POST',
      body: data,
    }),
  }),
}));

export const { useSaveWlConfigMutation, useWlConfigQuery } = api;
