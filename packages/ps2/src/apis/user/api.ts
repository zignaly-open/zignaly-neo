import { createApi } from '@reduxjs/toolkit/query/react';
import {
  LoginPayload,
  LoginResponse,
  SessionResponse,
  SignupPayload,
  SignupResponse,
  UserData,
} from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupPayload>({
      query: (credentials) => ({
        url: 'signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),

    verifyCodeNewUser: builder.mutation<void, { code: string }>({
      query: ({ code }) => ({
        url: `user/verify_code/verify_email`,
        method: 'POST',
        body: { code },
      }),
    }),

    resendCodeNewUser: builder.mutation<void, void>({
      query: () => ({
        url: `user/resend_code/verify_email`,
        method: 'POST',
      }),
    }),

    verifyCode: builder.mutation<void, { code: string }>({
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

    resendKnownDeviceCode: builder.mutation<void, void>({
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

    activateExchange: builder.mutation<void, { exchangeInternalId: string }>({
      query: ({ exchangeInternalId }) => ({
        url: `/user/exchanges/${exchangeInternalId}/activate`,
        method: 'POST',
      }),
    }),

    updateUser: builder.mutation<
      void,
      {
        userName?: string;
        imageUrl?: string;
        payFeeWithZig?: boolean;
        tradingFeeDiscount?: boolean;
        refRewardType?: string;
      }
    >({
      query: (params) => ({
        url: `/user`,
        method: 'POST',
        body: params,
      }),
    }),

    resetPasswordRequest: builder.mutation<
      void,
      {
        email: string;
      }
    >({
      query: (params) => ({
        url: `/user/request_action/forgotten_password`,
        method: 'POST',
        body: params,
      }),
    }),

    resetPassword: builder.mutation<
      void,
      {
        token: string;
        password: string;
      }
    >({
      query: (params) => ({
        url: `/user/confirm_action/forgotten_password`,
        method: 'POST',
        body: params,
      }),
    }),

    updatePassword: builder.mutation<
      void,
      {
        password: string;
        newPassword: string;
      }
    >({
      query: (params) => ({
        url: `/change_password`,
        method: 'POST',
        body: params,
      }),
    }),

    disable2FA: builder.mutation<
      void,
      {
        code: string;
      }
    >({
      query: (params) => ({
        url: `/user/disable_2fa`,
        method: 'POST',
        body: params,
      }),
    }),

    enable2FAInfo: builder.query<[string, string], void>({
      query: () => ({
        url: `/user/enable_2fa/step1`,
        method: 'POST',
      }),
    }),

    enable2FA: builder.mutation<
      void,
      {
        code: string;
      }
    >({
      query: (params) => ({
        url: `/user/enable_2fa/step2`,
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLogoutMutation,
  useLoginMutation,
  useLazyUserQuery,
  useLazySessionQuery,
  useActivateExchangeMutation,
  useVerify2FAMutation,
  useVerifyCodeMutation,
  useVerifyCodeNewUserMutation,
  useVerifyKnownDeviceMutation,
  useSetLocaleMutation,
  useResendCodeMutation,
  useResendCodeNewUserMutation,
  useResendKnownDeviceCodeMutation,
  useUpdateUserMutation,
  useResetPasswordRequestMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useDisable2FAMutation,
  useEnable2FAInfoQuery,
  useLazyEnable2FAInfoQuery,
  useEnable2FAMutation,
} = api;
