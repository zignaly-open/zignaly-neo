import { useEffect, useRef, useState } from 'react';
import {
  Exchange,
  ExtendedExchange,
  LoginPayload,
  LoginResponse,
  SessionsTypes,
  SignupPayload,
  UserAccessLevel,
  UserData,
} from './types';
import {
  useActivateExchangeMutation,
  useLazySessionQuery,
  useLazyUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useResendCodeMutation,
  useResendCodeNewUserMutation,
  useResendKnownDeviceCodeMutation,
  useSessionQuery,
  useSetLocaleMutation,
  useSignupMutation,
  useVerify2FAMutation,
  useVerifyCodeMutation,
  useVerifyCodeNewUserMutation,
  useSendCodeWithdrawMutation,
  useVerifyKnownDeviceMutation,
} from './api';
import {
  activateExchange,
  setAccessToken,
  setActiveExchangeInternalId,
  setSessionExpiryDate,
  setUser,
} from './store';
import { useDispatch, useSelector } from 'react-redux';
import { trackNewSession } from '../../util/analytics';
import { startLiveSession } from '../../util/liveSession';
import { RootState } from '../store';
import { useTranslation } from 'react-i18next';
import { ShowFnOutput } from 'mui-modal-provider';
import AuthVerifyModal from '../../views/Auth/components/AuthVerifyModal';
import { getImageOfAccount } from '../../util/images';
import { useLazyTraderServicesQuery } from '../service/api';
import { QueryReturnTypeBasic } from 'util/queryReturnType';
import { useZModal } from 'components/ZModal/use';
import Check2FAModal from 'views/Auth/components/Check2FAModal';
import { useNavigate } from 'react-router-dom';
import { track } from '@zignaly-open/tracker';
import { clearUserSession } from './util';
import { junkyard } from '../../util/junkyard';
import EmailVerifyWithdrawModal from 'views/Auth/components/EmailVerifyWithdrawModal';

const useStartSession = (eventType: SessionsTypes) => {
  const { showModal } = useZModal();
  const dispatch = useDispatch();
  const [loadSession] = useLazySessionQuery();
  const [loadTraderServices] = useLazyTraderServicesQuery();
  const [loadUser] = useLazyUserQuery();

  return async (
    user: { token: string; userId?: string } & Partial<LoginResponse>,
  ) => {
    dispatch(setAccessToken(user.token));
    user.userId && track({ userId: user.userId });
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
    trackNewSession(userData, eventType);
    junkyard.set('hasLoggedIn', 'true');
  };
};

export const useSignup = (): [
  { loading: boolean },
  (payload: SignupPayload) => Promise<void>,
] => {
  const [loading, setLoading] = useState(false);
  const [signup] = useSignupMutation();
  const startSession = useStartSession(SessionsTypes.Signup);

  return [
    { loading },
    async (payload: SignupPayload) => {
      setLoading(true);
      try {
        const user = await signup(payload).unwrap();
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
  const startSession = useStartSession(SessionsTypes.Login);

  const [loading, setLoading] = useState(false);

  // can't use useAsyncFn because https://github.com/streamich/react-use/issues/1768
  return [
    { loading },
    async (payload: LoginPayload) => {
      setLoading(true);

      try {
        const user = await login({
          ...payload,
        }).unwrap();
        await startSession(user);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    },
  ];
};

export function useLogout(performRequest = true): () => void {
  const dispatch = useDispatch();
  const [logoutRequest] = useLogoutMutation();
  const navigate = useNavigate();

  return () => {
    if (performRequest) {
      logoutRequest();
    }
    clearUserSession(dispatch);
    navigate('/login');
  };
}

export function useIsAuthenticated(): boolean {
  const user = useSelector((state: RootState) => state.user)?.user;
  return !!user;
}

export function useUserAccessLevel(): UserAccessLevel {
  return useSelector((state: RootState) => state.user)?.user?.accessLevel;
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
export const useSendCodeWithdraw: typeof useSendCodeWithdrawMutation =
  useSendCodeWithdrawMutation;
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
  const userData = useCurrentUser();
  const [newLocale, setNewLocale] = useState<string>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    // After logged in

    if (newLocale && userData?.locale !== newLocale) {
      // Update BE with custom locale if changed
      save({ locale: newLocale });
    } else if (userData?.locale !== i18n.language) {
      // Otherwise update locale to match BE
      i18n.changeLanguage(userData.locale);
    }
  }, [userData?.locale]);

  return (locale: string) => {
    i18n.changeLanguage(locale);
    if (isAuthenticated) {
      // Update locale to BE directly
      save({ locale });
    } else {
      // Save locale for BE update after login
      setNewLocale(locale);
    }
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

export function useActivateExchange(
  exchangeInternalId?: string,
): QueryReturnTypeBasic<void> {
  const exchange = useActiveExchange();
  const [activate, result] = useActivateExchangeMutation();
  const dispatch = useDispatch();

  const internalId = exchangeInternalId || exchange?.internalId;

  useEffect(() => {
    if (exchangeInternalId || (exchange && !exchange.activated)) {
      activate({
        exchangeInternalId: internalId,
      }).then(() => {
        dispatch(activateExchange(internalId));
      });
    }
  }, [internalId]);

  return result;
}

export function useMaybeMakeSureSessionIsAlive(makeSure: boolean): void {
  const isAuthenticated = useIsAuthenticated();
  useSessionQuery(undefined, {
    refetchOnMountOrArgChange: true,
    // we do not want to check that is the app is already aware that the user has been logged out
    skip: !makeSure || !isAuthenticated,
  });
}

export function useCheckWithdraw({
  status,
}: {
  status: QueryReturnTypeBasic<unknown>;
}): (action: (code?: string) => void) => void {
  const { showModal, updateModal } = useZModal();
  const modalId = useRef<null | string>(null);
  const { ask2FA } = useCurrentUser();
  useEffect(() => {
    if (modalId.current) {
      updateModal(modalId.current, {
        status,
      });
    }
  }, [status]);
  return (action) => {
    const modal = showModal(ask2FA ? Check2FAModal : EmailVerifyWithdrawModal, {
      status,
      action,
      TransitionProps: {
        onClose: () => {
          modalId.current = null;
        },
      },
    });

    modalId.current = modal.id;
  };
}

export function useCheck2FA({
  status,
}: {
  status: QueryReturnTypeBasic<unknown>;
}): (action: (code?: string) => void) => void {
  const { showModal, updateModal } = useZModal();
  const modalId = useRef<null | string>(null);
  const { ask2FA } = useCurrentUser();

  // Update prop: https://github.com/Quernest/mui-modal-provider/issues/2
  useEffect(() => {
    if (modalId.current) {
      updateModal(modalId.current, {
        status,
      });
    }
  }, [status]);

  if (!ask2FA) {
    return (action) => action();
  }

  return (action) => {
    const modal = showModal(Check2FAModal, {
      status,
      action,
      TransitionProps: {
        onClose: () => {
          modalId.current = null;
        },
      },
    });

    modalId.current = modal.id;
  };
}
