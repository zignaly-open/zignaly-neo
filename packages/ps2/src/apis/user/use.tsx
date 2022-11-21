import { useEffect, useState } from 'react';
import {
  Exchange,
  ExtendedExchange,
  LoginPayload,
  LoginResponse,
  SessionsTypes,
  SignupPayload,
  UserData,
} from './types';
import {
  useLazySessionQuery,
  useLazyUserQuery,
  useLoginMutation,
  useResendCodeMutation,
  useResendCodeNewUserMutation,
  useResendKnownDeviceCodeMutation,
  useSetLocaleMutation,
  useSignupMutation,
  useVerify2FAMutation,
  useVerifyCodeMutation,
  useVerifyCodeNewUserMutation,
  useVerifyKnownDeviceMutation,
} from './api';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {
  logout,
  setAccessToken,
  setActiveExchangeInternalId,
  setMissedRoute,
  setSessionExpiryDate,
  setUser,
} from './store';
import { useDispatch, useSelector } from 'react-redux';
import { trackEndSession, trackNewSession } from '../../util/analytics';
import { endLiveSession, startLiveSession } from '../../util/liveSession';
import { RootState } from '../store';
import { useTranslation } from 'react-i18next';
import { ShowFnOutput, useModal } from 'mui-modal-provider';
import AuthVerifyModal from '../../views/Auth/components/AuthVerifyModal';
import { getImageOfAccount } from '../../util/images';
import { useLazyTraderServicesQuery } from '../service/api';
import { ROUTE_PROFIT_SHARING } from 'routes';
import { useLocation } from 'react-router-dom';

const useStartSession = () => {
  const { showModal } = useModal();
  const dispatch = useDispatch();
  const [loadSession] = useLazySessionQuery();
  const [loadTraderServices] = useLazyTraderServicesQuery();
  const [loadUser] = useLazyUserQuery();
  const { i18n } = useTranslation();

  return async (user: { token: string } & Partial<LoginResponse>) => {
    dispatch(setAccessToken(user.token));

    const needsModal =
      user.ask2FA ||
      user.isUnknownDevice ||
      user.disabled ||
      user.emailUnconfirmed;

    if (needsModal) {
      let modal: ShowFnOutput<void>;
      await new Promise<void>((resolve, reject) => {
        modal = showModal(AuthVerifyModal, {
          user,
          onSuccess: resolve,
          onFailure: reject,
          close: () => modal.destroy(),
        });
      });
    }

    const [, userData] = await Promise.all([
      loadSession()
        .unwrap()
        .then(({ validUntil }) => dispatch(setSessionExpiryDate(validUntil))),
      loadUser().unwrap(),
      loadTraderServices().unwrap(),
    ]);

    dispatch(setUser(userData));
    startLiveSession(userData);
    trackNewSession(userData, SessionsTypes.Login);
    i18n.changeLanguage(userData.locale);
  };
};

export const useSignup = (): [
  { loading: boolean },
  (payload: SignupPayload) => Promise<void>,
] => {
  const [loading, setLoading] = useState(false);
  const [signup] = useSignupMutation();
  const startSession = useStartSession();
  const { state: locationState } = useLocation();
  const dispatch = useDispatch();

  return [
    { loading },
    async (payload: SignupPayload) => {
      setLoading(true);
      try {
        const user = await signup(payload).unwrap();
        if (!locationState) {
          dispatch(setMissedRoute(ROUTE_PROFIT_SHARING));
        }
        await startSession({ ...user, emailUnconfirmed: true });
      } finally {
        setLoading(false);
      }
    },
  ];
};

export const useAuthenticate = (): [
  { loading: boolean },
  (payload: LoginPayload) => Promise<void>,
] => {
  const [login] = useLoginMutation();
  const performLogout = useLogout();
  const startSession = useStartSession();

  const [loading, setLoading] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();
  // can't use useAsyncFn because https://github.com/streamich/react-use/issues/1768
  return [
    { loading },
    async (payload: LoginPayload) => {
      setLoading(true);
      const gRecaptchaResponse = await executeRecaptcha('login');

      try {
        const user = await login({
          ...payload,
          gRecaptchaResponse,
          c: 3,
        }).unwrap();
        await startSession(user);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        performLogout();
        throw e;
      }
    },
  ];
};

export function useLogout(): () => void {
  const dispatch = useDispatch();
  return () => {
    dispatch(logout());
    endLiveSession();
    trackEndSession();
  };
}

export function useIsAuthenticated(): boolean {
  const user = useSelector((state: RootState) => state.user)?.user;
  return !!user;
}

export function useCurrentUser(): UserData | Partial<UserData> {
  return (
    useSelector((state: RootState) => state.user)?.user || ({} as UserData)
  );
}

export const useVerify2FA: typeof useVerify2FAMutation = useVerify2FAMutation;
export const useVerifyEmailNewUser: typeof useVerifyCodeNewUserMutation =
  useVerifyCodeNewUserMutation;
export const useVerifyEmail: typeof useVerifyCodeMutation =
  useVerifyCodeMutation;
export const useVerifyEmailKnownDevice: typeof useVerifyKnownDeviceMutation =
  useVerifyKnownDeviceMutation;
export const useResendCode: typeof useResendCodeMutation =
  useResendCodeMutation;
export const useResendCodeNewUser: typeof useResendCodeNewUserMutation =
  useResendCodeNewUserMutation;
export const useResendKnownDeviceCode: typeof useResendKnownDeviceCodeMutation =
  useResendKnownDeviceCodeMutation;

export function useChangeLocale(): (locale: string) => void {
  const [save] = useSetLocaleMutation();
  const { i18n } = useTranslation();
  const isAuthenticated = useIsAuthenticated();

  return (locale: string) => {
    i18n.changeLanguage(locale);
    isAuthenticated && save({ locale });
  };
}

export const useGetExchangeByInternalId = (): ((
  internalId?: string,
) => ExtendedExchange | undefined) => {
  const { user, activeExchangeInternalId } = useSelector(
    (state: RootState) => state.user,
  );
  return (internalId) => {
    if (!user?.exchanges) return undefined;
    const id = internalId || activeExchangeInternalId;
    const exchange =
      id && user.exchanges?.find((x: Exchange) => x.internalId === id);
    if (!exchange) return undefined;

    return {
      ...exchange,
      image: getImageOfAccount(user.exchanges.indexOf(exchange)),
    };
  };
};

export function useActiveExchange(): ExtendedExchange | undefined {
  const { user, activeExchangeInternalId: internalId } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();

  const defaultExchange = user?.exchanges?.[0];
  const exchange = user?.exchanges?.find((x) => x.internalId === internalId);

  useEffect(() => {
    if (!exchange && defaultExchange) {
      dispatch(setActiveExchangeInternalId(defaultExchange.internalId));
    }
  }, [exchange]);

  const result = exchange || defaultExchange || undefined;
  return (
    result && {
      ...result,
      image: getImageOfAccount(user.exchanges.indexOf(result)),
    }
  );
}

export function useSelectExchange(): (exchangeInternalId: string) => void {
  const dispatch = useDispatch();
  return (exchangeInternalId) =>
    dispatch(setActiveExchangeInternalId(exchangeInternalId));
}
