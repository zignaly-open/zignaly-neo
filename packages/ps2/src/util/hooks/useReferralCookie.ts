import Cookies from 'js-cookie';
import { useEffect } from 'react';

/**
 * Save ref in cookies
 */
const useReferralCookie = (ref?: string, subtrack?: string) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inviteRef = params.get('invite');
    const inviteSubtrack = params.get('subtrack');
    if (ref || inviteRef) {
      Cookies.set('ref', ref || inviteRef);
      if (subtrack || inviteSubtrack) {
        Cookies.set('subtrack', subtrack || inviteSubtrack);
      }
    }
  }, [ref]);
};

export default useReferralCookie;
