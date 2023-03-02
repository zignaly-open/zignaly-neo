import Cookies from 'js-cookie';
import { useEffect } from 'react';

/**
 * Save ref in cookies
 */
const useReferralCookie = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('invite');
    const subtrack = params.get('subtrack');
    if (ref) {
      Cookies.set('ref', subtrack ? `${ref}:${subtrack}` : ref);
    }
  }, []);
};

export default useReferralCookie;
