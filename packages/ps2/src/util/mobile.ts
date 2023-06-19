import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { isMobile } from 'react-device-detect';
import {
  MOBILE_VERSION_AUTH_TOKEN_COOKIE,
  MOBILE_VERSION_FORCE_DESKTOP,
} from './constants';
import { useCurrentUser } from '../apis/user/use';
import { whitelabel } from '../whitelabel';

export function useMobileRedirect() {
  const goToMobileVersion = useGoToMobileVersion();
  useEffect(() => {
    if (
      whitelabel.promptMobile !== false &&
      isMobile &&
      !Cookies.get(MOBILE_VERSION_FORCE_DESKTOP)
    ) {
      goToMobileVersion();
    }
  }, [isMobile]);
}

export function useGoToMobileVersion() {
  const user = useCurrentUser();
  return () => {
    setCookies(user?.token);
    window.location.href = process.env.REACT_APP_MOBILE_VERSION_URL;
  };
}

function setCookies(token?: string) {
  Cookies.remove(MOBILE_VERSION_FORCE_DESKTOP);
  token &&
    Cookies.set(MOBILE_VERSION_AUTH_TOKEN_COOKIE, token, {
      domain: process.env.REACT_APP_MOBILE_VERSION_URL,
    });
  // note that it is not clear how the mobile version will set a cookie for the desktop version that ios hosted on a different domain
}

export { isMobile };
