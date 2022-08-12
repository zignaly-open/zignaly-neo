import { LoginPayload, SessionsTypes, UserData } from './types';
import { useLazySessionQuery, useLazyUserQuery, useLoginMutation } from './api';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useAsyncFn } from 'react-use';
import { AsyncFnReturn } from 'react-use/lib/useAsyncFn';
import { logout, setAccessToken, setSessionExpiryDate, setUser } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { trackEndSession, trackNewSession } from '../../util/analytics';
import { endLiveSession, startLiveSession } from '../../util/liveSession';
import { RootState } from '../store';
import { useTranslation } from 'react-i18next';

export const useAuthenticate = (): AsyncFnReturn<
  (payload: LoginPayload) => Promise<void>
> => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const performLogout = useLogout();
  const [loadSession] = useLazySessionQuery();
  const [loadUser] = useLazyUserQuery();
  const { i18n } = useTranslation();

  const { executeRecaptcha } = useGoogleReCaptcha();

  return useAsyncFn(
    async (payload: LoginPayload) => {
      const gRecaptchaResponse = await executeRecaptcha('login');
      const user = await login({
        ...payload,
        gRecaptchaResponse,
        cVersionRecaptcha: 2,
      }).unwrap();

      try {
        if (
          user.ask2FA ||
          user.isUnknownDevice ||
          user.disabled ||
          user.emailUnconfirmed
        ) {
          // TODO: show modal
          // yield put(openModal(modalsIds.AUTH_VERIFY));
        }

        dispatch(setAccessToken(user.token));

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
      } catch (e) {
        performLogout();
        throw e;
      }
    },
    [executeRecaptcha],
  );
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
