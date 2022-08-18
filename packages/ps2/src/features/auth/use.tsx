import { useCallback, useState } from 'react';
import { LoginPayload, SessionsTypes, UserData } from './types';
import { useLazySessionQuery, useLazyUserQuery, useLoginMutation } from './api';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { logout, setAccessToken, setSessionExpiryDate, setUser } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { trackEndSession, trackNewSession } from '../../util/analytics';
import { endLiveSession, startLiveSession } from '../../util/liveSession';
import { RootState } from '../store';
import { useTranslation } from 'react-i18next';
import { useModal } from 'mui-modal-provider';
import AuthVerifyModal from '../../components/auth/AuthVerifyModal';

export const useAuthenticate = (): [
  { loading: boolean },
  (payload: LoginPayload) => Promise<boolean>,
] => {
  const [login] = useLoginMutation();
  const performLogout = useLogout();
  const { showModal } = useModal();
  const [loading, setLoading] = useState(false);
  const [, complete] = useCompleteAuthentication();
  const { executeRecaptcha } = useGoogleReCaptcha();

  // can't use useAsyncFn because https://github.com/streamich/react-use/issues/1768
  return [
    { loading },
    useCallback(
      async (payload: LoginPayload) => {
        setLoading(true);
        const gRecaptchaResponse = await executeRecaptcha('login');

        try {
          const user = await login({
            ...payload,
            gRecaptchaResponse,
            cVersionRecaptcha: 2,
          }).unwrap();

          const needsModal =
            user.ask2FA ||
            user.isUnknownDevice ||
            user.disabled ||
            user.emailUnconfirmed;

          if (needsModal) {
            showModal(AuthVerifyModal, { token: user.token });
          } else {
            await complete(user.token);
          }

          return !needsModal;
        } catch (e) {
          const message = 'data' in e && (e.data?.error as { msg: string }).msg;
          performLogout();
          setLoading(false);
          throw message ? new Error(message) : e;
        }
      },
      [executeRecaptcha],
    ),
  ];
};

export const useCompleteAuthentication = (): [
  { loading: boolean },
  (token: string) => Promise<void>,
] => {
  const dispatch = useDispatch();
  const performLogout = useLogout();
  const [loadSession] = useLazySessionQuery();
  const [loadUser] = useLazyUserQuery();
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // can't use useAsyncFn because https://github.com/streamich/react-use/issues/1768

  return [
    { loading },
    useCallback(
      async (token: string) => {
        try {
          setLoading(true);
          dispatch(setAccessToken(token));

          const [, userData] = await Promise.all([
            loadSession()
              .unwrap()
              .then(({ validUntil }) =>
                dispatch(setSessionExpiryDate(validUntil)),
              ),
            loadUser().unwrap(),
            // TODO: we used to load services here from `/services/list`
          ]);

          // TODO: finish migrating all this:
          //     // 3. Set Profile
          //     yield put(setAuthValidUntil(sessionDataValidUntilTransform(session.validUntil)));
          //     const togglesAndData = yield call(selectTogglesAndData, dataProfile);
          //     yield put(setProfileToggles(togglesAndData.toggles));
          //     yield put(setProfileData(togglesAndData.data));
          //     yield put(setProfileExchanges(dataProfile.exchanges));
          //
          //     // 4. Set User Sentry
          //     yield call(Sentry.setUser, { email: dataProfile.email, id: dataProfile.userId });
          //
          //     // 5. InputSelect exchange Id
          //     const selectedExchange = yield call(initSelectedExchange, dataProfile.exchanges);
          //     yield put(setSelectedExchangeId(selectedExchange.id));
          //     yield put(setSelectedExchangeType(selectedExchange.type));
          //
          //     // 6. Exchange Types
          //     yield put(setExchangeTypes());
          //
          //     // 7. Set My Services List
          //     yield put(setServiceServices(dataServices));

          dispatch(setUser(userData));
          startLiveSession(userData);
          trackNewSession(userData, SessionsTypes.Login);
          i18n.changeLanguage(userData.locale);

          // fetch toggles const togglesAndData = yield select(recomposeTogglesAndData);
          // setLocale  state.userProfileSettings.data?.locale
          // TODO: clean on failure
          setLoading(false);
        } catch (e) {
          performLogout();
          setLoading(false);
          throw e;
        }
      },
      [executeRecaptcha],
    ),
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

export function useUser(): UserData | Partial<UserData> {
  return (
    useSelector((state: RootState) => state.auth)?.user || ({} as UserData)
  );
}
