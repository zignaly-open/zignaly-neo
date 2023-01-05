import { createApi } from '@reduxjs/toolkit/query/react';
import { ServiceApiKey, ServiceApiKeyPayload } from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  baseQuery,
  reducerPath: 'serviceApiKeyApi',
  tagTypes: ['ServiceApiKey'],
  endpoints: (builder) => ({
    serviceApiKeys: builder.query<ServiceApiKey[], { serviceId: string }>({
      providesTags: ['ServiceApiKey'],
      query: ({ serviceId }) => ({
        url: `services/${serviceId}/api_keys`,
      }),
    }),
    serviceApiKeyDelete: builder.mutation<
      never,
      { serviceId: string; keyId: string }
    >({
      invalidatesTags: ['ServiceApiKey'],
      query: ({ serviceId, keyId }) => ({
        method: 'DELETE',
        url: `services/${serviceId}/api_keys/${keyId}`,
      }),
    }),
    serviceApiKeyEdit: builder.mutation<
      ServiceApiKey,
      { serviceId: string; keyId: string; data: ServiceApiKeyPayload }
    >({
      invalidatesTags: ['ServiceApiKey'],
      query: ({ serviceId, keyId, data }) => ({
        method: 'PUT',
        url: `services/${serviceId}/api_keys/${keyId}`,
        body: data,
      }),
    }),
    serviceApiKeyCreate: builder.mutation<
      ServiceApiKey,
      { serviceId: string; alias: string }
    >({
      invalidatesTags: ['ServiceApiKey'],
      query: ({ serviceId, alias }) => ({
        method: 'POST',
        url: `services/${serviceId}/api_keys`,
        body: { alias },
      }),
    }),
  }),
});

export const {
  useServiceApiKeyCreateMutation,
  useServiceApiKeyDeleteMutation,
  useServiceApiKeyEditMutation,
  useServiceApiKeysQuery,
} = api;
