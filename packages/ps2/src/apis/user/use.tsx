import { useEffect, useState } from 'react';
import {
  Exchange,
  ExtendedExchange,
  LoginPayload,
  SessionsTypes,
  UserData,
} from './types';
import {
  useLazySessionQuery,
  useLazyUserQuery,
  useLoginMutation,
  useResendCodeMutation,
  useResendKnownDeviceCodeMutation,
  useSetLocaleMutation,
  useVerify2FAMutation,
  useVerifyCodeMutation,
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
import { useLocation } from 'react-router-dom';

export const useAuthenticate = (): [
  { loading: boolean },
  (payload: LoginPayload) => Promise<void>,
] => {
  const [login] = useLoginMutation();
  const performLogout = useLogout();
  const { showModal } = useModal();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadSession] = useLazySessionQuery();
  const [loadTraderServices] = useLazyTraderServicesQuery();
  const [loadUser] = useLazyUserQuery();
  const { i18n } = useTranslation();
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
            .then(({ validUntil }) =>
              dispatch(setSessionExpiryDate(validUntil)),
            ),
          loadUser().unwrap(),
          loadTraderServices().unwrap(),
        ]);

        dispatch(setUser(userData));
        startLiveSession(userData);
        trackNewSession(userData, SessionsTypes.Login);
        i18n.changeLanguage(userData.locale);
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
export const useVerifyEmail: typeof useVerifyCodeMutation =
  useVerifyCodeMutation;
export const useVerifyEmailKnownDevice: typeof useVerifyKnownDeviceMutation =
  useVerifyKnownDeviceMutation;
export const useResendCode: typeof useResendCodeMutation =
  useResendCodeMutation;
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

export function useSetMissedRoute(): () => void {
  const dispatch = useDispatch();
  const location = useLocation();
  return () => dispatch(setMissedRoute(location.pathname));
}

export function usePopMissedRoute(): () => string {
  const dispatch = useDispatch();
  const { missedRoute } = useSelector((state: RootState) => state.user);
  return () => {
    missedRoute && setTimeout(() => dispatch(setMissedRoute('')));
    return missedRoute;
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
