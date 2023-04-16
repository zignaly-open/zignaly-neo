import baseApiPs2 from '../baseApiPs2';
import { injectEndpoints } from 'apis/util';
export var api = injectEndpoints(baseApiPs2, function (builder) { return ({
    signup: builder.mutation({
        query: function (credentials) { return ({
            url: 'signup',
            method: 'POST',
            body: credentials,
        }); },
    }),
    logout: builder.mutation({
        query: function () { return ({
            url: 'logout',
            method: 'POST',
        }); },
    }),
    login: builder.mutation({
        query: function (credentials) { return ({
            url: 'login',
            method: 'POST',
            body: credentials,
        }); },
    }),
    verifyCodeNewUser: builder.mutation({
        query: function (_a) {
            var code = _a.code;
            return ({
                url: "user/verify_code/verify_email",
                method: 'POST',
                body: { code: code },
            });
        },
    }),
    resendCodeNewUser: builder.mutation({
        query: function () { return ({
            url: "user/resend_code/verify_email",
            method: 'POST',
        }); },
    }),
    verifyCode: builder.mutation({
        query: function (_a) {
            var code = _a.code;
            return ({
                url: "user/verify_code/enable_user",
                method: 'POST',
                body: { code: code },
            });
        },
    }),
    resendCode: builder.mutation({
        query: function () { return ({
            url: "user/resend_code/enable_user",
            method: 'POST',
        }); },
    }),
    verify2FA: builder.mutation({
        query: function (_a) {
            var code = _a.code;
            return ({
                url: "user/verify_2fa",
                method: 'POST',
                body: { code: code },
            });
        },
    }),
    verifyKnownDevice: builder.mutation({
        query: function (_a) {
            var code = _a.code;
            return ({
                url: "known_device/verify",
                method: 'POST',
                body: { code: code },
            });
        },
    }),
    resendKnownDeviceCode: builder.mutation({
        query: function () { return ({
            url: "/known_device/resend",
            method: 'POST',
        }); },
    }),
    setLocale: builder.mutation({
        query: function (_a) {
            var locale = _a.locale;
            return ({
                url: "/user/save_locale",
                method: 'POST',
                body: { locale: locale },
            });
        },
    }),
    user: builder.query({
        query: function () { return ({
            url: 'user',
            headers: { 'Accept-version': '2' },
        }); },
    }),
    session: builder.query({
        query: function () { return ({
            url: 'user/session',
        }); },
    }),
    activateExchange: builder.mutation({
        query: function (_a) {
            var exchangeInternalId = _a.exchangeInternalId;
            return ({
                url: "/user/exchanges/".concat(exchangeInternalId, "/activate"),
                method: 'POST',
            });
        },
    }),
    updateUser: builder.mutation({
        query: function (params) { return ({
            url: "/user",
            method: 'POST',
            body: params,
        }); },
    }),
    resetPasswordRequest: builder.mutation({
        query: function (params) { return ({
            url: "/user/request_action/forgotten_password",
            method: 'POST',
            body: params,
        }); },
    }),
    resetPassword: builder.mutation({
        query: function (params) { return ({
            url: "/user/confirm_action/forgotten_password",
            method: 'POST',
            body: params,
        }); },
    }),
    updatePassword: builder.mutation({
        query: function (params) { return ({
            url: "/change_password",
            method: 'POST',
            body: params,
        }); },
    }),
    disable2FA: builder.mutation({
        query: function (params) { return ({
            url: "/user/disable_2fa",
            method: 'POST',
            body: params,
        }); },
    }),
    enable2FAInfo: builder.query({
        query: function () { return ({
            url: "/user/enable_2fa/step1",
            method: 'POST',
        }); },
    }),
    enable2FA: builder.mutation({
        query: function (params) { return ({
            url: "/user/enable_2fa/step2",
            method: 'POST',
            body: params,
        }); },
    }),
    balance: builder.query({
        query: function (exchangeInternalId) { return ({
            url: "user/exchanges/".concat(exchangeInternalId, "/balance"),
        }); },
    }),
}); });
export var useSignupMutation = api.useSignupMutation, useLogoutMutation = api.useLogoutMutation, useLoginMutation = api.useLoginMutation, useLazyUserQuery = api.useLazyUserQuery, useLazySessionQuery = api.useLazySessionQuery, useActivateExchangeMutation = api.useActivateExchangeMutation, useVerify2FAMutation = api.useVerify2FAMutation, useVerifyCodeMutation = api.useVerifyCodeMutation, useSessionQuery = api.useSessionQuery, useVerifyCodeNewUserMutation = api.useVerifyCodeNewUserMutation, useVerifyKnownDeviceMutation = api.useVerifyKnownDeviceMutation, useSetLocaleMutation = api.useSetLocaleMutation, useResendCodeMutation = api.useResendCodeMutation, useResendCodeNewUserMutation = api.useResendCodeNewUserMutation, useResendKnownDeviceCodeMutation = api.useResendKnownDeviceCodeMutation, useUpdateUserMutation = api.useUpdateUserMutation, useResetPasswordRequestMutation = api.useResetPasswordRequestMutation, useResetPasswordMutation = api.useResetPasswordMutation, useUpdatePasswordMutation = api.useUpdatePasswordMutation, useDisable2FAMutation = api.useDisable2FAMutation, useEnable2FAInfoQuery = api.useEnable2FAInfoQuery, useLazyEnable2FAInfoQuery = api.useLazyEnable2FAInfoQuery, useEnable2FAMutation = api.useEnable2FAMutation, useBalanceQuery = api.useBalanceQuery;
//# sourceMappingURL=api.js.map