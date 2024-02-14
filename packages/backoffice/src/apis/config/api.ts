import baseApiBackoffice from '../baseApiBackoffice';
import { injectEndpoints } from 'apis/util';
import { WhitelabelConfig } from './types';

export const api = injectEndpoints(baseApiBackoffice, (builder) => ({
  wlConfig: builder.query<WhitelabelConfig, string>({
    query: (slug) => ({
      url: `wl_configuration/${slug}`,
      method: 'GET',
    }),
    providesTags: ['WlConfig'],
  }),
  saveWlConfig: builder.mutation<
    WhitelabelConfig,
    { slug: string; data: WhitelabelConfig }
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
