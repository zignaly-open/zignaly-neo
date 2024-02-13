import baseApiBackoffice from '../baseApiBackoffice';
import { injectEndpoints } from 'apis/util';
import { WhitelabelConfig } from './types';

export const api = injectEndpoints(baseApiBackoffice, (builder) => ({
  config: builder.query<WhitelabelConfig, string>({
    query: (slug) => ({
      url: `wl_configuration/${slug}`,
      method: 'GET',
    }),
  }),
  saveConfig: builder.mutation<
    WhitelabelConfig,
    { slug: string; data: WhitelabelConfig }
  >({
    query: ({ slug, data }) => ({
      url: `wl_configuration/${slug}`,
      method: 'POST',
      body: data,
    }),
  }),
}));

export const { useSaveConfigMutation, useConfigQuery } = api;
