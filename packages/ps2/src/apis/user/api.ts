import {
  KycLinkResponse,
  KycResponse,
  LoginPayload,
  LoginResponse,
  SessionResponse,
  SignupPayload,
  SignupResponse,
  UserBalance,
  UserData,
} from './types';
import baseApiPs2 from '../baseApiPs2';
import { injectEndpoints } from 'apis/util';

let lastUsdBalance = null as number;

export const api = injectEndpoints(baseApiPs2, (builder) => ({
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
  sendCodeWithdraw: builder.mutation<void, void>({
    query: () => ({
      url: `user/resend_code/withdraw`,
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

  kycStatus: builder.query<KycResponse, string>({
    query: (level) => ({
      url: `user/kyc/${level}`,
    }),
  }),

  kycStatuses: builder.query<
    { status: KycResponse[]; KYCMonitoring: boolean },
    void
  >({
    query: () => ({
      url: `user/kyc`,
    }),
  }),

  kycLink: builder.query<KycLinkResponse, string>({
    query: (level) => ({
      url: `user/kyc/${level}/link`,
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
      email?: string;
      about?: string;
      countryCode: string;
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
      code?: string;
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

  balance: builder.query<
    UserBalance,
    { exchangeInternalId: string; force?: boolean }
  >({
    query: ({ exchangeInternalId, force }) => ({
      url: `user/exchanges/${exchangeInternalId}/balance`,
      params: { force },
    }),
    providesTags: ['Balance'],
    async onQueryStarted(_, { dispatch, queryFulfilled }) {
      const { data } = await queryFulfilled;
      // Invalidate assets if USD balance changed
      const usdBalance = (data as UserBalance)?.totalUSDT;
      if (lastUsdBalance && usdBalance !== lastUsdBalance) {
        dispatch(api.util.invalidateTags(['Assets']));
      }
      lastUsdBalance = usdBalance;
    },
    extraOptions: {
      silent: true,
    },
  }),
}));

export const {
  useSignupMutation,
  useLogoutMutation,
  useLoginMutation,
  useLazyUserQuery,
  useLazySessionQuery,
  useActivateExchangeMutation,
  useVerify2FAMutation,
  useVerifyCodeMutation,
  useSessionQuery,
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
  useLazyKycLinkQuery,
  useKycStatusesQuery,
  useLazyKycStatusesQuery,
  useKycStatusQuery,
  useEnable2FAMutation,
  useBalanceQuery,
  useLazyBalanceQuery,
  useSendCodeWithdrawMutation,
} = api;
