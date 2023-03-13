import {
  ServiceApiKey,
  ServiceApiKeyDeletePayload,
  ServiceApiKeyPayload,
} from './types';
import baseApiPs2 from '../baseApiPs2';

export const api = baseApiPs2.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    serviceApiKeys: builder.query<ServiceApiKey[], { serviceId: string }>({
      providesTags: ['ServiceApiKey'],
      query: ({ serviceId }) => ({
        url: `services/${serviceId}/api_keys`,
      }),
    }),
    serviceApiKeyDelete: builder.mutation<never, ServiceApiKeyDeletePayload>({
      invalidatesTags: (result) => (result ? ['ServiceApiKey'] : []),
      query: ({ serviceId, keyId, code }) => ({
        method: 'DELETE',
        url: `services/${serviceId}/api_keys/${keyId}`,
        body: { code },
      }),
    }),
    serviceApiKeyEdit: builder.mutation<
      ServiceApiKey,
      { serviceId: string; keyId: string; data: ServiceApiKeyPayload }
    >({
      invalidatesTags: (result) => (result ? ['ServiceApiKey'] : []),
      query: ({ serviceId, keyId, data }) => ({
        method: 'PUT',
        url: `services/${serviceId}/api_keys/${keyId}`,
        body: data,
      }),
    }),
    serviceApiKeyCreate: builder.mutation<
      ServiceApiKey,
      { serviceId: string; alias: string; code?: string }
    >({
      invalidatesTags: (result) => (result ? ['ServiceApiKey'] : []),
      query: ({ serviceId, alias, code }) => ({
        method: 'POST',
        url: `services/${serviceId}/api_keys`,
        body: { alias, code },
      }),
    }),
  }),
});

export const {
  useServiceApiKeyCreateMutation,
  useServiceApiKeyDeleteMutation,
  useServiceApiKeyEditMutation,
  useServiceApiKeysQuery,
  useLazyServiceApiKeysQuery,
} = api;
