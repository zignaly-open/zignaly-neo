import { useState } from 'react';
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
  setSessionExpiryDate,
  setUser,
} from './store';
import { useDispatch, useSelector } from 'react-redux';
import { trackEndSession, trackNewSession } from '../../util/analytics';
import { endLiveSession, startLiveSession } from '../../util/liveSession';
import { RootState } from '../store';
import { useTranslation } from 'react-i18next';
import { ShowFnOutput, useModal } from 'mui-modal-provider';
import AuthVerifyModal from './components/AuthVerifyModal';
import { getImageOfAccount } from '../../util/images';
import { useLazyTraderServicesQuery } from '../trader/api';
import { useLazyAllCoinsQuery } from '../myBalances/api';

const throwBackendErrorInOurFormat = async <T,>(
  promise: Promise<T>,
): Promise<T> => {
  try {
    return await promise;
  } catch (e) {
    throw { message: (e.data?.error as { msg: string }).msg };
  }
};

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
        const user = await throwBackendErrorInOurFormat(
          login({
            ...payload,
            gRecaptchaResponse,
            cVersionRecaptcha: 2,
          }).unwrap(),
        );

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
              close: () => modal.hide(),
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
  const user = useSelector((state: RootState) => state.auth)?.user;
  return !!user;
}

export function useCurrentUser(): UserData | Partial<UserData> {
  return (
    useSelector((state: RootState) => state.auth)?.user || ({} as UserData)
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

export const useGetExchangeByInternalId = (): ((
  internalId?: string,
) => ExtendedExchange | undefined) => {
  const { user, activeExchangeInternalId } = useSelector(
    (state: RootState) => state.auth,
  );
  return (internalId) => {
    if (!user?.exchanges) return undefined;
    const id = internalId || activeExchangeInternalId;
    const exchange =
      (id && user.exchanges?.find((x: Exchange) => x.internalId === id)) ||
      user.exchanges[0];

    return {
      ...exchange,
      image: getImageOfAccount(user.exchanges.indexOf(exchange)),
    };
  };
};

export function useActiveExchange(): ExtendedExchange | undefined {
  const getExchange = useGetExchangeByInternalId();
  return getExchange();
}

export function useSelectExchange(): (exchangeInternalId: string) => void {
  const dispatch = useDispatch();
  const activeExchange = useActiveExchange();
  const getExchangeByInternalId = useGetExchangeByInternalId();
  const [loadAllCoins] = useLazyAllCoinsQuery();
  return (exchangeInternalId) => {
    const newSelectedExchange = getExchangeByInternalId(exchangeInternalId);
    const needsCoinsReFetched =
      activeExchange?.exchangeType !== newSelectedExchange?.exchangeType;
    dispatch(setActiveExchangeInternalId(exchangeInternalId));
    if (needsCoinsReFetched) {
      loadAllCoins(newSelectedExchange?.exchangeType);
    }
  };
}
