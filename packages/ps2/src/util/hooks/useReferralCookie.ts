import Cookies from 'js-cookie';
import { useEffect } from 'react';

/**
 * Save ref in cookies
 */
const useReferralCookie = (ref?: string) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inviteRef = params.get('invite');
    const subtrack = params.get('subtrack');
    if (ref || inviteRef) {
      Cookies.set('ref', ref || inviteRef);
      if (subtrack) {
        Cookies.set('subtrack', subtrack);
      }
    }
  }, [ref]);
};

export default useReferralCookie;
