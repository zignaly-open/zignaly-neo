import { createApi } from '@reduxjs/toolkit/query/react';
import {
  LoginFullPayload,
  LoginResponse,
  SessionResponse,
  UserData,
} from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginFullPayload>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),

    verifyCode: builder.mutation<void, { reason: string; code: string }>({
      query: ({ code }) => ({
        url: `user/verify_code/enable_user`,
        method: 'POST',
        body: { code },
      }),
    }),

    resendCode: builder.mutation<void, void>({
      query: () => ({
        url: `user/resend_code/enable_user`,
        method: 'POST',
      }),
    }),

    verify2FA: builder.mutation<void, { code: string }>({
      query: ({ code }) => ({
        url: `user/verify_2fa`,
        method: 'POST',
        body: { code },
      }),
    }),

    verifyKnownDevice: builder.mutation<void, { code: string }>({
      query: ({ code }) => ({
        url: `known_device/verify`,
        method: 'POST',
        body: { code },
      }),
    }),

    resendKnownDeviceCode: builder.mutation<LoginResponse, void>({
      query: () => ({
        url: `/known_device/resend`,
        method: 'POST',
      }),
    }),

    setLocale: builder.mutation<void, { locale: string }>({
      query: ({ locale }) => ({
        url: `/user/save_locale`,
        method: 'POST',
        body: { locale },
      }),
    }),

    user: builder.query<UserData, void>({
      query: () => ({
        url: 'user',
        headers: { 'Accept-version': '2' },
      }),
    }),

    session: builder.query<SessionResponse, void>({
      query: () => ({
        url: 'user/session',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyUserQuery,
  useLazySessionQuery,
  useVerify2FAMutation,
  useVerifyCodeMutation,
  useVerifyKnownDeviceMutation,
  useSetLocaleMutation,
  useResendCodeMutation,
  useResendKnownDeviceCodeMutation,
} = api;
